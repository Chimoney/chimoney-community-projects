import re
import tweepy
from utils import is_following
from chimoney import Chimoney
import logging


# Set up logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
    handlers=[logging.FileHandler("chisend.log"), logging.StreamHandler()],
)
logger = logging.getLogger(__name__)


class ChiSend(object):
    def __init__(
        self,
        api_key,
        api_secret,
        bearer_token,
        access_key,
        access_secret,
        chimoney_api_key,
        screen_name,
    ):
        self.search_terms = ["@chisendtest"]
        self.stream = self.MyStream(
            bearer_token=bearer_token,
            api_key=api_key,
            api_secret=api_secret,
            access_key=access_key,
            access_secret=access_secret,
            chimoney_api_key=chimoney_api_key,
            screen_name=screen_name,
        )

    def clear_search_terms(self):
        # make self.search_terms empty
        self.search_terms = []

    def add_search_term(self, term):
        # Add a term to search_terms
        self.search_terms.append(term)

    def remove_search_term(self, term):
        # Remove a term from search_terms
        self.search_terms.remove(term)

    def start_stream(self):
        # Adding terms to search rules
        # It's important to know that these rules don't get deleted when you stop the
        # program, so you'd need to use stream.get_rules() and stream.delete_rules()
        # to change them, or you can use the optional parameter to stream.add_rules()
        # called dry_run (set it to True, and the rules will get deleted after the bot
        # stopped running).

        for term in self.search_terms:
            self.stream.add_rules(tweepy.StreamRule(term))

        # Starting stream
        self.stream.filter(
            tweet_fields=["referenced_tweets", "author_id", "id", "text"]
        )

    class MyStream(tweepy.StreamingClient):
        def __init__(
            self,
            api_key,
            api_secret,
            bearer_token,
            access_key,
            access_secret,
            chimoney_api_key,
            screen_name,
        ):
            self.client = tweepy.Client(
                bearer_token, api_key, api_secret, access_key, access_secret
            )

            self.auth = tweepy.OAuth1UserHandler(
                api_key, api_secret, access_key, access_secret
            )
            self.api = tweepy.API(self.auth)

            super().__init__(bearer_token=bearer_token)
            self.chimoney_api_key = chimoney_api_key
            self.account_id = self.api.get_user(screen_name=screen_name).id
            self.screen_name = screen_name

            # Set up the message template
            self.MESSAGE_TEMP = (
                "Hello, this is a payment link for you. Please pay the amount "
                "specified to the address specified. If you have any questions, "
                "please contact @chimoney. \n"
                "Payment Link: {}\n"
                "ChiRef: {}"
            )
            self.messages = {
                "not_following": f"Please follow @{self.screen_name} to use this bot",
                "check_dm": "Please check your DMs for the payment link",
                "wrong_format": (
                    "Please use the correct format to use this bot\n e.g."
                    "@{} send $10 to @thelimeskies \n"
                    "(see pin tweet for more info)"
                ),
                "donation": "Thank you for your donation!",
                "bot_error": "Sorry, there was an error with the bot. Please try again later",
            }

        MESSAGE_TEMP = """Hello, I am Chisend Bot. I was mentioned by you.
                    To proceed to payout click this link: {}, Thank you.
                    This is an automated message.
                    Ref: {}"""

        def on_connect(self):
            logging.info("Stream Started")

        def on_error(self, error):
            logging.error(error)
            if error == 420:
                return False  # returning False in on_error disconnects the stream

        def on_disconnect(self):
            logging.info("Stream Stopped")

        def send_tweet(self, tweet, reply_id):
            """
            This function sends a tweet

            Args:
                tweet (str): The tweet to be sent

            Returns:
                None
            """
            self.api.update_status(
                status=tweet,
                in_reply_to_status_id=reply_id,
                auto_populate_reply_metadata=True,
            )
            logging.info("Tweet sent to {}".format(reply_id))

        def send_dm(self, user_id, message):
            """
            This function sends a direct message to the user who mentioned the bot

            Args:
                tweet (dict): The tweet that passed the stream

            Returns:
                None
            """
            # Send a direct message to the user who mentioned the bot
            try:
                self.api.send_direct_message(user_id, message)
                logging.info("Direct Message sent to {}".format(user_id))
            except:
                logging.error("Error sending direct message")

        def perform_task(self, tweet_content):
            # Split the tweet content
            tweet_content = tweet_content.split()

            # Get the task name
            task_name = tweet_content[1]

            # Get the amount and recipients
            amount = tweet_content[2]

            # Get the recipients
            if "to" in tweet_content:
                recipients = tweet_content[tweet_content.index("to") + 1 :]
            else:
                recipients = tweet_content[3:]

            # Perform the task
            if task_name == "send":
                # Call pychimoney payout initiate function
                chimoney = Chimoney.set_api_key(self.chimoney_api_key)
                checkout_value = []

                # check if ammount contains a dollar sign
                if "$" in amount:
                    amount = amount.replace("$", "")

                for recipient in recipients:
                    temp = {
                        "twitter": recipient,
                        "valueInUSD": int(amount),
                    }
                    checkout_value.append(temp)

                task_status = chimoney.payouts.initiate_chimoney(
                    chimoneys=checkout_value
                )

                # check is the response is a success
                if task_status[1] == 200:
                    # Get the payout link from the task status
                    payment_link = task_status[0]["data"]["paymentLink"]
                    chiRef = task_status[0]["data"]["data"][0]["id"]

                    response = {"paymentLink": payment_link, "chiRef": chiRef}
                    return response
                else:
                    return None

        def on_tweet(self, tweet):
            """
            This function gets called when a tweet passes the stream

            Args:
                tweet (dict): The tweet that passed the stream

            Returns:
                None
            """

            logging.info("Tweet received: {}".format(tweet["text"]))

            # regex to check if the tweet is a reply
            # replace @send_chimoney with the value of your bot's screen name

            reply_regex = re.compile(rf"^\@{re.escape(self.screen_name)}")

            # regex to check if the tweet follows the correct format for the bot
            # @chisendtest send 10 @user1 @user2 @user3
            # @chisendtest send $10 to @user1 @user2 @user3
            # @chisendtest send 10 to @user1 @user2 @user3
            # @chisendtest send $10 @user1 @user2 @user3

            correct_regex = [
                re.compile(
                    rf"^\@{re.escape(self.screen_name)}\s+send\s+\$?\d+\s+to\s+\@\w+(\s+\@\w+)*"
                ),
                re.compile(
                    rf"^\@{re.escape(self.screen_name)}\s+send\s+\$?\d+\s+\@\w+(\s+\@\w+)*"
                ),
                re.compile(
                    rf"^\@{re.escape(self.screen_name)}\s+send\s+\$?\d+\s+to\s+\@\w+(\s+\@\w+)*"
                ),
                re.compile(
                    rf"^\@{re.escape(self.screen_name)}\s+send\s+\$?\d+\s+\@\w+(\s+\@\w+)*"
                ),
            ]

            # if it's a reply check if it follows the correct format
            if reply_regex.match(tweet["text"]):
                if correct_regex[0].match(tweet["text"]) or correct_regex[1].match(
                    tweet["text"]
                ):
                    logging.info("Tweet is in the correct format")
                    if is_following(
                        self.api, tweet["author_id"], self.account_id
                    ):  # check if the user is following the bot

                        user_id = tweet["author_id"]
                        tweet_content = tweet["text"]
                        # Perform the task
                        task_status = self.perform_task(tweet_content)
                        # Check if the task was successful
                        if task_status:
                            # Get the payment link
                            payment_link = task_status["paymentLink"]
                            chiRef = task_status["chiRef"]

                            # Send the payment link to the user
                            message = self.MESSAGE_TEMP.format(payment_link, chiRef)
                            self.send_dm(user_id, message)
                            self.send_tweet("Check Your DM", tweet["id"])
                        else:
                            # Send a message to the user
                            message = "There was an error performing the task"
                            self.send_dm(user_id, message)
                            self.send_tweet("Check Your DM", tweet["id"])
                    elif not is_following(
                        self.api, tweet["author_id"], self.account_id
                    ):
                        self.send_tweet(self.messages["not_following"], tweet["id"])
                else:
                    self.send_tweet(
                        self.messages["wrong_format"].format(self.screen_name),
                        tweet["id"],
                    )
            else:
                logging.info("Tweet is not a reply")
