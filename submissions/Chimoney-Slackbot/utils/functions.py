def get_user_email(client, user_id):
    user = client.web_client.users_info(user=user_id)
    return user["user"]["profile"]["email"]


def get_bot_id(client):
    return client.web_client.auth_test()["user_id"]


def is_mention(client, event, bot_id=None):
    if not bot_id:
        bot_id = get_bot_id(client)
    return event["text"].startswith(f"<@{bot_id}>")


def send_chimoney(client, user_ids, amount):
    emails = []
    for user_id in user_ids:
        emails.append(get_user_email(client, user_id))
    pass
