from app import app, db
from flask import render_template, request, redirect, url_for
from app.models import AccessToken
from slack_sdk.web import WebClient
import os

import logging

logging.basicConfig(level=logging.DEBUG)

client_id = os.environ.get("SLACK_CLIENT_ID")
client_secret = os.environ.get("SLACK_CLIENT_SECRET")


@app.route("/slack/install", methods=["GET"])
def oauth_redirect():
    state = "randomly-generated-one-time-value"
    return f"""
        <a href="https://slack.com/oauth/authorize?client_id={client_id}&scope=bot&state={state}><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
    """


@app.route("/slack/oauth_redirect", methods=["GET"])
def oauth_callback():
    code = request.args.get("code")
    client = WebClient()
    print(code)
    # response = client.oauth_v2_access(
    #     client_id=client_id,
    #     client_secret=client_secret,
    #     code=code,
    # )

    # oauth_scope v1 response
    response = client.oauth_access(
        client_id=client_id,
        client_secret=client_secret,
        code=code,
    )
    print(response)

    access_token = response["bot"]["bot_access_token"]
    team_id = response["team_id"]

    # check if team_id already exists
    all_tokens = get_all_access_token()
    if all_tokens:
        for token in all_tokens:
            if token.team_id == team_id:
                return "Already installed!"

    db.session.add(AccessToken(team_id=team_id, access_token=access_token))
    db.session.commit()

    # team_id = response["team"]["id"]
    # access_token = response["access_token"]
    # db.session.add(AccessToken(team_id, access_token))
    # db.session.commit()
    return "Success!"


def get_all_access_token():
    with app.app_context():
        all_tokens = AccessToken.query.all()
    return all_tokens


with app.app_context():
    db.create_all()

print(get_all_access_token())
