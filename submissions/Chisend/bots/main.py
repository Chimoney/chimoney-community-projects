#!/usr/bin/env python3

from dotenv import load_dotenv
import os
import argparse

load_dotenv()

parser = argparse.ArgumentParser(description="Chisend Bot")

parser.add_argument(
    "-ue",
    "--use_env",
    help="Use environment variables for the API keys",
    action="store_true",
)


KEYS = {
    "api_key": "",
    "api_secret": "",
    "bearer_token": "",
    "access_key": "",
    "access_secret": "",
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


# import ChiSend from the chisend.py file
from chisend import ChiSend

# create an instance of ChiSend
chisend = ChiSend(**KEYS)
chisend.clear_search_terms()
# add a search term
chisend.add_search_term("@chisendtest")
chisend.start_stream()
