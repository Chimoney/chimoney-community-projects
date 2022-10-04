import tweepy
import logging
from config import create_api
from pychimoney import Chimoney

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

# Twitter Bot that when mentioned, will call a function to perform a task using the tweet content
# and send a direct message to the user who mentioned the bot.
MESSAGE_TEMP = "Hello, I am Chisend Bot. I was mentioned by you. \
                To proceed to payout click this link: {}, Thank you.\
                This is an automated message.\
                Ref: {}"


class ChisendBot(tweepy.streaming.StreamListener):
    def __init__(self, api):
        self.api = api
        self.me = api.me()

    def send_dm(self, user, message):
        api = create_api()
        api.send_direct_message(user, message)

    def perform_task(self, tweet):
        # Perform a task using the tweet content
        # tweet format: "@chisendbot task_name ammount recipient/[recipients]"
        # example: "@chisendbot send 1000 to @user1 @user2"

        # Split the tweet content
        tweet_content = tweet.split()
        task_name = tweet_content[1]
        amount = tweet_content[2]
        recipients = tweet_content[3:]

        # Perform the task
        if task_name == "send":
            # Call pychimoney payout initiate function
            chimoney = Chimoney()
            checkout_value = []

            for recipient in recipients:
                temp = {
                    "twitter": recipient,
                    "amount": amount,
                }
                checkout_value.append(temp)

            task_status = chimoney.payouts.initiate_chimoney(chimoneys=checkout_value)

            # check is the response is a success
            if task_status["status"] == 200:
                # Get the payout link from the task status
                payment_link = task_status["data"]["paymentLink"]
                chiRef = task_status["data"]["data"]["id"]

                response = {"paymentLink": payment_link, "chiRef": chiRef}
                return response
            else:
                return None

    def on_status(self, tweet):
        logger.info(f"Processing tweet id {tweet.id}")

        # Check if the tweet is a mention of the bot and the user is not the bot
        if tweet.in_reply_to_status_id is not None or tweet.user.id == self.me.id:
            # Reply to the tweet with a Check your DM message
            self.api.update_status(
                status="Check your DM",
                in_reply_to_status_id=tweet.id,
            )
            # Get the tweet content
            tweet_content = tweet.text

            # Perform the task
            task_status = self.perform_task(tweet_content)

            # Send a direct message to the user who mentioned the bot
            if task_status is not None:
                message = MESSAGE_TEMP.format(
                    task_status["paymentLink"], task_status["chiRef"]
                )
                self.send_dm(tweet.user.id, message)

    def on_error(self, status):
        logger.error(status)


def main(keywords):
    api = create_api()
    tweets_listener = ChisendBot(api)
    stream = tweepy.Stream(api.auth, tweets_listener)
    stream.filter(track=keywords, languages=["en"])


if __name__ == "__main__":
    main(["@chisendbot"])
    # main(["@chisendbot", "@chisendbot send 1000 to @user1 @user2"])
