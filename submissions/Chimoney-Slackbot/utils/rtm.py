import os
from slack_sdk.rtm_v2 import RTMClient
from dotenv import load_dotenv
import logging
import multiprocessing
from functions import is_valid_command, send_chimoney, is_mention

logging.basicConfig(level=logging.DEBUG)

load_dotenv()


def start_rtm(token):
    rtm_client = RTMClient(token=token)

    @rtm_client.on("message")
    def print_events(client: RTMClient, event: dict):
        # send a messenge to the user direct message
        if is_valid_command(client, event):
            print(event["text"])
            response = send_chimoney(client, event["text"])
            if response:
                client.web_client.chat_postMessage(
                    channel=event["user"],
                    text=f"Payment link: {response['payment_link']}",
                )
            else:
                client.web_client.chat_postMessage(
                    channel=event["user"],
                    text=f"Something went wrong, please try again later",
                )

    @rtm_client.on("message")
    def handle(client: RTMClient, event: dict):
        if "Hello" in event["text"]:
            channel_id = event["channel"]
            thread_ts = event["ts"]
            user = event[
                "user"
            ]  # This is not username but user ID (the format is either U*** or W***)

            client.web_client.chat_postMessage(
                channel=channel_id, text=f"Hi <@{user}>!", thread_ts=thread_ts
            )

    return rtm_client.start()


def run_processes():
    processes = []

    for token in os.getenv("SLACK_TOKENS").split(","):
        process = multiprocessing.Process(target=start_rtm, args=(token,))
        process.start()
        processes.append(process)

    print(f"{len(processes)} processes started")

    for process in processes:
        process.join()


if __name__ == "__main__":
    start_rtm(os.getenv("SLACK_CLIENT_TOKEN"))
