import os
from chimoney import Chimoney


def get_user_email(client, user_id):
    user = client.web_client.users_info(user=user_id)
    return user["user"]["profile"]["email"]


def get_bot_id(client):
    return client.web_client.auth_test()["user_id"]


def is_mention(client, event, bot_id=None):
    if not bot_id:
        bot_id = get_bot_id(client)
    return event["text"].startswith(f"<@{bot_id}>")


def is_valid_command(client, event, bot_id=None):
    if not bot_id:
        bot_id = get_bot_id(client)
    return event["text"].startswith(f"<@{bot_id}> send")


def send_chimoney(client, text, amount):
    # Split the tweet content
    tweet_content = text.split()

    # Get the amount and recipients
    amount = tweet_content[2]

    # remove <@ and > from the string
    if "to" in tweet_content:
        recipients = [recipient[2:-1] for recipient in tweet_content[4:]]
    recipients = [recipient[2:-1] for recipient in tweet_content[3:]]

    # Get the recipients
    if "to" in tweet_content:
        recipients = tweet_content[tweet_content.index("to") + 1 :]
    else:
        recipients = tweet_content[3:]

    checkout_value = []
    for user_id in recipients:
        temp = {
            "email": get_user_email(client, user_id),
            "amount": amount,
        }
        checkout_value.append(temp)

    chimoney = Chimoney.set_api_key(os.getenv("CHIMONEY_API_KEY"))
    task_status = chimoney.payouts.initiate_chimoney(checkout_value)

    if task_status[1] == 200:
        # Get the payout link from the task status
        payment_link = task_status[0]["data"]["paymentLink"]
        chiRef = task_status[0]["data"]["data"][0]["id"]

        response = {"payment_link": payment_link, "chiRef": chiRef}
        return response
    else:
        return None
