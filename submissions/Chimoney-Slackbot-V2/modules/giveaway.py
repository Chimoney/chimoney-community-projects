from chimoney import Chimoney
import time
import random
from dotenv import load_dotenv
import os
from .sendchimoney import get_user_email_from_username

load_dotenv()


# Initialize Chimoney and set the API key
chimoney = Chimoney()
chimoney.set_api_key(os.getenv("CHIMONEY_AUTH_KEY"))


async def initiate_chimoney_async(checkout_values):
    return chimoney.payouts.initiate_chimoney(checkout_values)


async def giveaway_with_tagged_users(client, text):
    checkout_values = []
    text_content = text.split()
    number_of_winners = int(text_content[0])
    paticipants = text_content[1:-1]
    prize_pool = int(clean_amount(text_content[-1]))
    prize = prize_pool / number_of_winners

    # Checks if the opration is possible
    if len(paticipants) < number_of_winners:
        return None

    winners = random.sample(paticipants, number_of_winners)
    winners = [{"user_id": winner} for winner in winners]

    for winner in winners:
        # get winner's email from email
        try:
            winner["email"] = await get_user_email_from_username(
                client, winner["user_id"]
            )
            # Add delay to avoid rate limiting
            time.sleep(1)
        except Exception as e:
            print(f"Error looking up user {winner['user_id']}: {str(e)}")
            # If the user is not found, remove them from the list of winners
            winners.remove(winner)

    for winner in winners:
        checkout_values.append(
            {
                "email": winner["email"],
                "valueInUSD": prize,
            }
        )

    if not checkout_values:
        return None

    task_status = await initiate_chimoney_async(checkout_values)
    if task_status[1] == 200:
        # Get the payout link
        payment_link = task_status[0]["data"]["paymentLink"]
        chiRef = task_status[0]["data"]["data"][0]["id"]

        return {
            "payment_link": payment_link,
            "chiRef": chiRef,
            "winners": winners,
        }


async def random_giveaway(client, text, channel_id):
    """
    Randomly selects users from the channel to receive Chimoney.
    The command contain the number of winners and the prize pool ammount.
    The command must be in the format "random <number of winners> <prize amount>".
    """

    text_content = text.split()
    number_of_winners = int(text_content[1])
    prize_pool = int(clean_amount(text_content[2]))
    checkout_values = []

    # Get the list of users in the channel
    users = await get_channel_users(client, channel_id=channel_id)

    # Checks if the opration is possible
    if len(users) < number_of_winners:
        return None

    # Randomly select winners
    winners = random.sample(users, number_of_winners)
    winners = [{"user_id": winner} for winner in winners]

    # Get the email address of each winner
    for winner in winners:
        try:
            winner["email"] = await get_user_email(client, winner["user_id"])
            # Add delay to avoid rate limiting
            time.sleep(1)
        except Exception as e:
            print(f"Error looking up user {winner['user_id']}: {str(e)}")
            # If the user is not found, remove them from the list of winners
            winners.remove(winner)

    # Calculate the prize for each winner
    prize = prize_pool / number_of_winners

    # Send Chimoney to each winner
    for winner in winners:
        checkout_values.append(
            {
                "email": winner["email"],
                "valueInUSD": prize,
            }
        )

    if not checkout_values:
        return None

    task_status = await initiate_chimoney_async(checkout_values)

    if task_status[1] == 200:
        # Get the payout link
        payment_link = task_status[0]["data"]["paymentLink"]
        chiRef = task_status[0]["data"]["data"][0]["id"]

        return {
            "payment_link": payment_link,
            "chiRef": chiRef,
            "winners": winners,
        }
    else:
        return None


def clean_amount(amount):
    """
    Removes any non-numeric characters from the amount.
    """
    return "".join([c for c in amount if c.isdigit()])


async def get_channel_users(client, channel_id):
    """
    Gets a list of users in the channel.
    """
    channel_info = await client.conversations_members(channel=channel_id, limit=1000)
    users = channel_info["members"]
    return users


async def get_user_email(client, user_id):
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
