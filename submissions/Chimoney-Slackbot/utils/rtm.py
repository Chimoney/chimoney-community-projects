import os
from slack_sdk.rtm_v2 import RTMClient
from dotenv import load_dotenv
import logging
import multiprocessing

logging.basicConfig(level=logging.DEBUG)

load_dotenv()


def start_rtm(token):
    rtm_client = RTMClient(token=token)

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
