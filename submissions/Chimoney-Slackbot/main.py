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


def main():
    # start web server process
    p1 = multiprocessing.Process(target=web_server.start_server)
    p1.start()

    # get all the slack tokens from database
    tokens = get_slack_tokens()

    # start rtm process for each token

    # check for new tokens every 5 minutes
    while True:
        time.sleep(300)
        tokens = get_slack_tokens()
        for token in tokens:
            if token not in processes:
                process = multiprocessing.Process(target=rtm.start_rtm, args=(token,))
                process.start()
                processes.append(process)


if __name__ == "__main__":
    main()
