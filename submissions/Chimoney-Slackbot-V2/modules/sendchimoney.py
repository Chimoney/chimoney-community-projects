from chimoney import Chimoney
import time
from dotenv import load_dotenv
import os

load_dotenv()


# Initialize Chimoney and set the API key
chimoney = Chimoney()
chimoney.set_api_key(os.getenv("CHIMONEY_AUTH_KEY"))

# Initialize a cache for user data, with separate caches for each workspace
workspace_user_caches = {}
cache_expiry_time = 3600  # Cache expires after 1 hour (adjust as needed)

# Initialize a cache for user_list data for each workspace
user_list_cache = {}
user_list_cache_timestamp = {}
user_list_cooldown = 300  # Cooldown time in seconds (adjust as needed)


async def initiate_chimoney_async(checkout_values):
    return chimoney.payouts.initiate_chimoney(checkout_values)


async def send_chimoney(client, text, team_id):
    """
    Send Chimoney to recipients based on a text command.

    Args:
        client (Slack WebClient): The Slack API client.
        text (str): The command text.

    Returns:
        dict or None: A dictionary containing payment information, or None if there's an error.
    """
    text_content = text.split()
    print(text_content)
    amount = clean_amount(text_content[0])
    print(amount)
    recipients = text_content[1:]
    print(recipients)

    checkout_values = []
    for user_id in recipients:
        try:
            email = await get_user_email_from_username(client, user_id, team_id)
        except Exception as e:
            print(f"Error looking up user {user_id}: {str(e)}")
            email = None
        if email:
            checkout_values.append(
                {
                    "email": email,
                    "valueInUSD": int(amount),
                }
            )

    if not checkout_values:
        return None

    task_status = await initiate_chimoney_async(checkout_values)

    if task_status[1] == 200:
        # Get the payout link from the task status
        payment_link = task_status[0]["data"]["paymentLink"]
        chiRef = task_status[0]["data"]["data"][0]["id"]

        response = {"payment_link": payment_link, "chiRef": chiRef}
        return response
    else:
        return None


def clean_amount(amount):
    """
    Clean an amount by removing the $ or # symbol.

    Args:
        amount (str): The amount to clean.

    Returns:
        str: The cleaned amount.
    """
    amount = amount.replace("$", "")
    amount = amount.replace("#", "")
    return amount.strip()


def get_user_email(client, user_id):
    """
    Get the email address of a Slack user by user ID.

    Args:
        client (Slack WebClient): The Slack API client.
        user_id (str): The user's Slack user ID.

    Returns:
        str or None: The user's email address, or None if the user is not found.
    """
    try:
        user_info = client.users_info(user=user_id)
        return user_info["user"]["profile"]["email"]
    except Exception as e:
        print(f"Error looking up user {user_id}: {str(e)}")
        return None


async def get_user_email_from_username(client, username, workspace_id):
    username = clean_username(username)
    # Check if the workspace has a cache
    if workspace_id not in workspace_user_caches:
        workspace_user_caches[workspace_id] = {}

    workspace_cache = workspace_user_caches[workspace_id]

    if username in workspace_cache:
        email = workspace_cache[username].get("email")
        if email:
            return email

    try:
        current_time = time.time()
        # Check if cooldown time has passed since the last user_list call
        if (
            workspace_id not in user_list_cache
            or (current_time - user_list_cache_timestamp.get(workspace_id, 0))
            >= user_list_cooldown
        ):
            # Fetch and cache the user_list data for this workspace
            response = await client.users_list()
            # print(response["members"])
            user_list_cache[workspace_id] = response["members"]
            user_list_cache_timestamp[
                workspace_id
            ] = current_time  # Update the timestamp
            # Populate the workspace cache with user data
            for user in user_list_cache[workspace_id]:
                try:
                    workspace_cache[user["name"]] = {
                        "email": user["profile"]["email"],
                        "timestamp": current_time,
                    }
                except KeyError:
                    pass
            if username in workspace_cache:
                email = workspace_cache[username].get("email")
                if email:
                    return email
        return None
    except Exception as e:
        print(f"Error looking up user {username} in workspace {workspace_id}: {str(e)}")
        return None


def clean_username(name):
    """
    Clean a username by removing the @ symbol.

    Args:
        name (str): The username to clean.

    Returns:
        str: The cleaned username.
    """
    name = name.replace("@", "")
    return name.strip()
