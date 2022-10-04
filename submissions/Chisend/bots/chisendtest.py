import tweepy
import time
from dotenv import load_dotenv
from pychimoney import Chimoney

load_dotenv()

MESSAGE_TEMP = "Hello, I am Chisend Bot. I was mentioned by you. \
                To proceed to payout click this link: {}, Thank you.\
                This is an automated message.\
                Ref: {}"

# keys and tokens from the Twitter Dev Console
api_key = ""
api_secret = ""
bearer_token = ""
access_key = ""
access_secret = ""

client = tweepy.Client(bearer_token, api_key, api_secret, access_key, access_secret)

auth = tweepy.OAuth1UserHandler(api_key, api_secret, access_key, access_secret)
api = tweepy.API(auth)

search_terms = ["@chisendtest"]


class MyStream(tweepy.StreamingClient):
    def send_dm(self, user_id, message):
        # Send a direct message to the user who mentioned the bot
        try:
            api.send_direct_message(user_id, message)
        except:
            pass

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

            task_status = chimoney.payouts.initiate_chimoney(chimoneys=checkout_value)

            # check is the response is a success
            if task_status[1] == 200:
                # Get the payout link from the task status
                payment_link = task_status[0]["data"]["paymentLink"]
                chiRef = task_status[0]["data"]["data"][0]["id"]

                response = {"paymentLink": payment_link, "chiRef": chiRef}
                return response
            else:
                return None

    # This function gets called when the stream is working
    def on_connect(self):

        print("Connected")

    def is_following(self, user_id):
        # Check if the user is following the bot
        # Get My ID
        my_id = 1576721087500632064
        try:
            omo = api.exis(source_id=user_id, target_id=my_id)
            print("User is following {}".format(omo))
            return True
        except:
            return False

    # This function gets called when a tweet passes the stream
    def on_tweet(self, tweet):
        """
        This function gets called when a tweet passes the stream

        Args:
            tweet (dict): The tweet that passed the stream
        
        Returns:
            None

        TODO: 
            - Check if the user is following the bot
            - Check if the tweet is a reply
            - Check if the tweet is a mention
            - Check if the tweet is a retweet
            - Check if the tweet is a quote
            - Check if the tweet is a reply to a mention
            - Check if the tweet is a reply to a retweet
            - Check if the tweet is a reply to a quote
            - Check if the tweet is a reply to a reply
        """

        # check if the tweet is not a created by 

        if tweet.referenced_tweets == None:
            # Reply to the tweet with a Check your DM message
            api.update_status(
                status="Check your DM {}".format(tweet.author_id),
                in_reply_to_status_id=tweet.id,
                auto_populate_reply_metadata=True,
            )
            # Get the tweet content
            tweet_content = tweet.text

            # Perform the task
            task_status = self.perform_task(tweet_content)
            print(task_status)

            # Send a direct message to the user who mentioned the bot
            if task_status is not None:
                print("Sending DM")
                message = MESSAGE_TEMP.format(
                    task_status["paymentLink"], task_status["chiRef"]
                )
                omo = api.send_direct_message(tweet.author_id, message)
                print(omo)


# Creating Stream object
stream = MyStream(bearer_token=bearer_token)

# Adding terms to search rules
# It's important to know that these rules don't get deleted when you stop the
# program, so you'd need to use stream.get_rules() and stream.delete_rules()
# to change them, or you can use the optional parameter to stream.add_rules()
# called dry_run (set it to True, and the rules will get deleted after the bot
# stopped running).

for term in search_terms:
    stream.add_rules(tweepy.StreamRule(term))

# Starting stream
stream.filter(tweet_fields=["referenced_tweets", "author_id", "id"])
