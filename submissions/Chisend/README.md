# CHISEND TWITTER BOT

The Chisend Twitter Bot that send chimoney to a user when called by a tweet.

## INFO

The bot is written in Python and uses the [Tweepy](https://www.tweepy.org/) library to interact with the Twitter API.
It Uses the pychimoney library to send the chimoney.

## How to use
    - Follow the bot on twitter
    - Tweet the bot with the following format
        - @chisendtest send ammount to @username
    - The bot will you a direct message for confirmation and checkout
    - ChiSpend will send the amount to the user

    FOR EXAMPLE
    @chisendtest send 100 to @chisendtest

    FOR multiple users
    @chisendtest send 100 to @chisendtest, @chisendtest2

## How to run
    - Clone the repo
    - Create a .env file with the following variables
        - CONSUMER_KEY
        - CONSUMER_SECRET
        - ACCESS_TOKEN
        - ACCESS_TOKEN_SECRET
    - Docker build -t chisend .
    - Docker run -d chisend

## TODO 
[ ] Get a developer Twitter Account to test 
[ ] Intergrate with pychimoney
    [ ] Test the bot
[ ] Deploy the bot
[ ] Add a web interface to the bot
[ ] Make sending Asynchronous using celery
[ ] Add multi-user send 
[ ] Add More features

## BLOCKERS
[ ] Get a developer Twitter Account to test 
[ ] Intergrate with pychimoney(WIP 80% done by @thelimeskies)