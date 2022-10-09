#!/usr/bin/env python3

from dotenv import load_dotenv
import os
import argparse
from chisend import ChiSend

load_dotenv()

parser = argparse.ArgumentParser(description="Chisend Bot")

parser.add_argument(
    "-ue",
    "--use_env",
    help="Use environment variables for the API keys",
    action="store_true",
)

# create logs folder if it doesn't exist
if not os.path.exists("logs"):
    os.mkdir("logs")


KEYS = {
    "api_key": "",
    "api_secret": "",
    "bearer_token": "",
    "access_key": "",
    "access_secret": "",
    "chimoney_api_key": "",
    "screen_name": "",
}

# check if the user wants to use environment variables
if parser.parse_args().use_env:
    load_dotenv()

    # get the keys and tokens from the .env file
    KEYS["api_key"] = os.getenv("API_KEY")
    KEYS["api_secret"] = os.getenv("API_SECRET")
    KEYS["bearer_token"] = os.getenv("BEARER_TOKEN")
    KEYS["access_key"] = os.getenv("ACCESS_KEY")
    KEYS["access_secret"] = os.getenv("ACCESS_SECRET")
    KEYS["chimoney_api_key"] = os.getenv("CHIMONEY_API_KEY")
    KEYS["screen_name"] = os.getenv("SCREEN_NAME")

# create an instance of ChiSend
chisend = ChiSend(
    api_key=KEYS["api_key"],
    api_secret=KEYS["api_secret"],
    bearer_token=KEYS["bearer_token"],
    access_key=KEYS["access_key"],
    access_secret=KEYS["access_secret"],
    chimoney_api_key=KEYS["chimoney_api_key"],
    screen_name=KEYS["screen_name"],
)

term = "@" + KEYS["screen_name"]  # type: ignore

chisend.clear_search_terms()
# add a search term
chisend.add_search_term([term])
chisend.start_stream()
