from dotenv import load_dotenv
import os
import argparse

load_dotenv()

parser = argparse.ArgumentParser(description="Chisend Slack Bot")

parser.add_argument(
    "-ue",
    "--use_env",
    help="Use environment variables for the API keys",
    action="store_true",
)

API_KEYS = {
    "slack_key": "",
    "chimoney_key": "",
}

if parser.parse_args().use_env:
    API_KEYS["slack_key"] = os.getenv("SLACK_API_KEY")
    API_KEYS[""]
