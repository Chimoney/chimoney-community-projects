import os
from slack_sdk import WebClient
from flask import Flask, request
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

client_id = os.environ.get("SLACK_CLIENT_ID")
client_secret = os.environ.get("SLACK_CLIENT_SECRET")
oauth_scope = os.environ.get("SLACK_OAUTH_SCOPE")


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "DATABASE_URL", "sqlite:///db.sqlite3"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db = SQLAlchemy(app)

    class AccessToken(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        team_id = db.Column(db.String(255), unique=True, nullable=False)
        access_token = db.Column(db.String(255), unique=True, nullable=False)

        def __repr__(self):
            return f"Team ID: {self.team_id}, Access Token: {self.access_token}"

        def __init__(self, team_id, access_token):
            self.team_id = team_id
            self.access_token = access_token

    @app.route("/slack/install", methods=["GET"])
    def oauth_redirect():
        return f"""
            <a href="https://slack.com/oauth/authorize?client_id={client_id}&scope=bot"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
        """

    @app.route("/slack/oauth_redirect", methods=["GET"])
    def oauth_callback():
        code = request.args.get("code")
        client = WebClient()
        response = client.oauth_v2_access(
            client_id=client_id,
            client_secret=client_secret,
            code=code,
            redirect_uri="https://92c8-102-89-47-98.eu.ngrok.io/slack/oauth_redirect",
        )
        print(response)
        team_id = response["team"]["id"]
        access_token = response["access_token"]
        db.session.add(AccessToken(team_id, access_token))
        db.session.commit()
        return "Success!"

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
