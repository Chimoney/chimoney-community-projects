import tweepy
from pychimoney import Chimoney


class ChiSend(object):
    def __init__(self, api_key, api_secret, bearer_token, access_key, access_secret):
        self.search_terms = ["@chisendtest"]
        self.client = self.MyStream(
            bearer_token=bearer_token,
            api_key=api_key,
            api_secret=api_secret,
            access_key=access_key,
            access_secret=access_secret,
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
            self.client.add_rules(tweepy.StreamRule(term))

        # Starting stream
        self.client.filter(
            tweet_fields=["referenced_tweets", "author_id", "id", "text"]
        )

    class MyStream(tweepy.StreamingClient):
        def __init__(
            self, api_key, api_secret, bearer_token, access_key, access_secret
        ):

            super().__init__(bearer_token=bearer_token)

            self.client = tweepy.Client(
                bearer_token, api_key, api_secret, access_key, access_secret
            )

            self.auth = tweepy.OAuth1UserHandler(
                api_key, api_secret, access_key, access_secret
            )
            self.api = tweepy.API(self.auth)

            # Set up the message template
            self.MESSAGE_TEMP = (
                "Hello, this is a payment link for you. Please pay the amount "
                "specified to the address specified. If you have any questions, "
                "please contact @chimoney. \n"
                "Payment Link: {}\n"
                "ChiRef: {}"
            )

        MESSAGE_TEMP = """Hello, I am Chisend Bot. I was mentioned by you.
                    To proceed to payout click this link: {}, Thank you.
                    This is an automated message.
                    Ref: {}"""

        def on_connect(self):
            print("Connected")

        def on_error(self, error):
            print(error)
            if error == 420:
                return False  # returning False in on_error disconnects the stream

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
            except:
                print("Error sending message")

        def perform_task(self, tweet_content):
            # Split the tweet content
            tweet_content = tweet_content.split()

            # Get the task name
            task_name = tweet_content[1]

            # Get the amount and recipients
            amount = tweet_content[2]
            recipients = tweet_content[4:]

            # Perform the task
            if task_name == "send":
                # Call pychimoney payout initiate function
                chimoney = Chimoney()
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

            print(type(tweet))
            print(tweet.keys())
            print(tweet["referenced_tweets"])
            print(tweet["author_id"])

            if not tweet["referenced_tweets"]:
                user_id = tweet["author_id"]

                # Get the tweet content
                tweet_content = tweet["text"]

                # Perform the task
                task_status = self.perform_task(tweet_content)
                print(task_status)

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
