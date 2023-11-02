# Chimoney Telegram Bot

### Requirements to deploy
- Nodejs 18.xx
- Telegram API key from [Botfather](t.me/botfather)
- Chimoney Dev API Key

### Steps to depoly

- Clone this repository to your local machine:
- Change dir
`cd \submissions\teleram-bot-node`
- Install project dependencies using npm:
`npm install`

Create a .env file in the project directory and set the following environment variables:

- `PORT`: Port on which the bot's HTTP server will run.
- `BOT_URL`: Your github bot's URL.
- `API_KEY`: Your API key for Chimoney integration.
- `REDIRECT_URL`: Redirect URL for Chimoney transactions.
- `CHIMONEY_BASE_URL`: Base URL for Chimoney operations.
- `CHIMONEY_BASE_HOST`: Chimoney base host URL.
- `DEFAULT_EMAIL`: Default email to receive transactions updates.

Start the Chimoney Telegram Bot:

`npm start`
