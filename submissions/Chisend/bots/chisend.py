import tweepy
import logging
import os
from config import create_api

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()


# Twitter Bot that when mentioned, will call a function to perform a task using the tweet content
# and send a direct message to the user who mentioned the bot.
MESSAGE_TEMP = "Hello, I am Chisend Bot. I was mentioned by you. \
                To proceed to payout click this link: {}, Thank you."


class ChisendBot(tweepy.StreamListener):
    def __init__(self, api):
        self.api = api
        self.me = api.me()

    def on_status(self, tweet):
        logger.info(f"Processing tweet id {tweet.id}")
        if tweet.in_reply_to_status_id is not None or tweet.user.id == self.me.id:
            # This tweet is a reply or I'm its author so, ignore it
            return
        if not tweet.favorited:
            # Mark it as Liked, since we have not done it yet
            try:
                tweet.favorite()
            except Exception as e:
                logger.error("Error on fav", exc_info=True)
        if not tweet.retweeted:
            # Retweet, since we have not retweeted it yet
            try:
                tweet.retweet()
            except Exception as e:
                logger.error("Error on fav and retweet", exc_info=True)

    def on_error(self, status):
        logger.error(status)


def main(keywords):
    api = create_api()
    tweets_listener = ChisendBot(api)
    stream = tweepy.Stream(api.auth, tweets_listener)
    stream.filter(track=keywords, languages=["en"])


def send_dm(user, message):
    api = create_api()
    api.send_direct_message(user, message)


def perform_task(tweet):
    # Perform a task using the tweet content
    # tweet format: "@chisendbot task_name ammount recipient/[recipients]"
    # example: "@chisendbot send 1000 to @user1 @user2"

    # Split the tweet content into a list
    tweet_content = tweet.split()

    # Get the task name
    task_name = tweet_content[1]

    # Get the amount
    amount = tweet_content[2]

    # Get the recipients
    recipients = tweet_content[3:]

    # Perform the task
    if task_name == "send":
        # Call pychimoney payout initiate function
        # can be made async using celery and redis for better performance
        return "Success"

    # Send a direct message to the user who mentioned the bot.


if __name__ == "__main__":
    main(["@chisendbot"])
    # main(["@chisendbot", "@chisendbot send 1000 to @user1 @user2"])
