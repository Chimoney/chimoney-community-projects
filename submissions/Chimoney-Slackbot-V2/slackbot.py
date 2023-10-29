from slack_bolt.oauth.async_oauth_settings import AsyncOAuthSettings
from slack_bolt.async_app import AsyncApp
import os
from slack_sdk.oauth.installation_store import sqlalchemy
from slack_sdk.oauth.state_store import FileOAuthStateStore
from modules.validators import validate_sendchimoney_text
from sqlalchemy import create_engine
from modules.sendchimoney import (
    send_chimoney as send_chimoney_response,
    get_user_email_from_username,
)
import logging

logger = logging.getLogger(__name__)

from dotenv import load_dotenv
import os

load_dotenv()

installation_store = sqlalchemy.SQLAlchemyInstallationStore(
    client_id=os.environ["CLIENT_ID"],
    engine=create_engine(os.environ["DATABASE_URL"]),
    logger=logger,
)

# Initializes your app with your bot token and signing secret
SLACK_SIGNING_SECRET = os.environ["SLACK_SIGNING_SECRET"]
CLIENT_ID = os.environ["CLIENT_ID"]
CLIENT_SECRET = os.environ["CLIENT_SECRET"]
# OAUTH_REDIRECT_URI = os.environ["OAUTH_REDIRECT_URI"]


# Initializes your Slack Client and Bolt App
# client = WebClient(token=SLACK_API_TOKEN)
app = AsyncApp(
    signing_secret=SLACK_SIGNING_SECRET,
    oauth_settings=AsyncOAuthSettings(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        scopes=["channels:read", "groups:read", "chat:write"],
        installation_store=installation_store,
        state_store=FileOAuthStateStore(
            expiration_seconds=600, base_dir="./data/oauth_states"
        ),
    ),
)


@app.command("/sendchimoney")
async def send_chimoney(ack, say, command, client, logger):
    await ack()
    logger.info(command)
    try:
        # user_info = await client.users_info(user=command["user_id"])
        # user_email = user_info.data["user"]["profile"]["email"]
        # await say(f"Hey there {user_email}!")

        # # send private message to user
        # await client.chat_postMessage(
        #     channel=command["user_id"],
        #     text="This is a test message from your app! :tada:",
        # )
        # text = command["text"]
        # email = await get_user_email_from_username(client, text, command["team_id"])
        # if email:
        #     await client.chat_postMessage(
        #         channel=command["user_id"],
        #         text="Email: " + email,
        #     )
        # else:
        #     await client.chat_postMessage(
        #         channel=command["user_id"],
        #         text="An error occurred while processing your request.",
        #     )

        text = command["text"]

        valid, text_type = validate_sendchimoney_text(text)
        if valid:
            if text_type == "SASMU":
                send_chimoney_text = await send_chimoney_response(
                    client, text, command["team_id"]
                )
                if send_chimoney_text:
                    await client.chat_postMessage(
                        channel=command["user_id"],
                        text="Payment link: " + send_chimoney_text["payment_link"],
                    )
                else:
                    await client.chat_postMessage(
                        channel=command["user_id"],
                        text="An error occurred while processing your request.",
                    )

        else:
            logger.info({"text": text, "valid": valid, "text_type": text_type})
            print({"text": text, "valid": valid, "text_type": text_type})
            await say(f"Error: {text_type}")

    except Exception as e:
        await say(f"An error occurred: {str(e)}")


@app.event("app_mention")
async def event_test(body, say, logger):
    logger.info(body)
    await say("What's up?")


# Start your app
if __name__ == "__main__":
    app.start(port=int(os.environ.get("PORT", 3000)))
    #   SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"]).start()
