from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv()

client_id = os.environ.get("SLACK_CLIENT_ID")
client_secret = os.environ.get("SLACK_CLIENT_SECRET")
oauth_scope = os.environ.get("SLACK_OAUTH_SCOPE")

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "omo")
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "sqlite:///" + os.path.join(basedir, "mydatabase.db")
)

db = SQLAlchemy(app)


app.config.from_object(__name__)
from app import views
