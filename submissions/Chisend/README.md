# CHISEND TWITTER BOT

The Chisend Twitter Bot that send chimoney to a user when called by a tweet.

NOTE: This is a work in progress and is not yet ready for use. Need pychimoney to be released first.
But it could still be setup 

Docker is supported.

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

## DEMO PICTURES
Example of a tweet to the bot

![alt text](images/1.png "Demo 1")

![alt text](images/2.png "Demo 2")

![alt text](images/3.png "Demo 3")

## How to run
    - Clone the repo
    - Create a .env file with the following variables
        - CONSUMER_KEY
        - CONSUMER_SECRET
        - ACCESS_TOKEN
        - ACCESS_TOKEN_SECRET
    - Docker build -t chisend .
    - Docker run -d chisend
OR
    - Create a virtual environment
    - Install the requirements
    - Run the ```python  ./main.py -ue ``` command
        to use the environment variables
    - Run the ```python  ./main.py ``` command

## TODO 
- [x] Get a developer Twitter Account to test 
- [x] Intergrate with pychimoney
    - [x] Test the bot
- [ ] Deploy the bot
- [ ] Add a web interface to the bot
- [ ] Make sending Asynchronous using celery
- [ ] Add multi-user send 
- [ ] Add More features

## BLOCKERS
- [x] Get a developer Twitter Account to test 
- [ ] Intergrate with pychimoney(WIP 80% done by @thelimeskies)