# Chimoney Slack Bot

The Chimoney Slack Bot is a Python application designed to facilitate money transfers within a Slack workspace. Users can send money to other users via simple commands, and the bot handles the rest.

## Features

- Send money within your Slack workspace.
- Seamless integration with Slack's UI.
- Multi-workspace support with OAuth integration.

## Installation
To install your Slack bot using the provided link, follow these steps:

Click on the installation link: https://stingray-app-3r8tj.ondigitalocean.app/slack/install.

You'll be redirected to the installation page. Click "Install to Workspace" to start the installation process.

If prompted, log in to your Slack workspace.

Review the requested permissions and click "Allow." This will initiate the OAuth installation process.

After you click "Allow," the Slack bot will be installed in your workspace.

To start using your newly installed bot, simply mention it in a channel or use any slash commands or interactions it supports.

The Slack bot is now successfully installed and ready to assist in your Slack workspace.

### Requirements

Before installing the Chimoney Slack Bot, ensure you have the following:

- Python 3.9+
- A Slack workspace where you can install the bot.
- A [Chimoney](https://chimoney.io/) account with an API key.
- A Slack Application from [Slack API](https://api.slack.com/)

### Installation Steps

1. Clone this repository to your local machine:
2. Change into the project directory:

   ```shell
   cd \submissions\Chimoney-Slackbot-V2\
   ```

3. Install project dependencies using pip:

   ```shell
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the project directory and set the following environment variables:

   ```env
   SLACK_SIGNING_SECRET=your_slack_signing_secret
   CLIENT_ID=your_slack_app_client_id
   CLIENT_SECRET=your_slack_app_client_secret
   OAUTH_REDIRECT_URI=your_oauth_redirect_uri
   CHIMONEY_AUTH_KEY=your_chimoney_api_key
   ```

   Replace the placeholders with your actual credentials.


5. Start the Chimoney Slack Bot:

   ```shell
   python slackbot.py
   ```

6. The bot should now be running and listening for commands in your Slack workspace.

## Usage

To use the Chimoney Slack Bot, follow these steps:

1. Invite the bot to a channel or use a slash command.

2. Use the `/sendchimoney` command followed by the payment details. For example:

   ```
   /sendchimoney $50 @username1 @username2
   ```

3. The bot will handle the payment process and provide you with a payment link.

## Multi-Workspace Support

The Chimoney Slack Bot inherently supports multi-workspace configurations. This means that the bot can be easily deployed and used in multiple Slack workspaces without complex modifications. The bot adapts to different workspaces, enabling you to expand your user base across various Slack communities.

It only needs to be deployed once and can be installed on any workspace using OAuth.

## Deploying the Slackbot(Optional)

This section provides detailed steps on deploying your Slackbot on different platforms: Render, AWS, and Heroku. Choose the platform that best suits your requirements.

### Deploying on Render

1. **Create an Account on Render**: If you don't have one already, sign up on [Render](https://render.com/) and log in.

2. **Create a New Web Service**:
   - Choose a name for your service.
   - Set your deployment region.
   - Configure environment variables.
   - Define the path to your Dockerfile and port.
   - Click "Create Web Service."

3. **Connect Your GitHub Repository (Optional)**: If your code is hosted on GitHub, connect your repository to Render.

4. **Deploy Your Slackbot**:
   - Click "Deploy" to initiate the deployment process.
   - Render will build your Docker image, deploy it, and handle routing and SSL certificates.
   - Once deployed, you'll receive a live URL for your Slackbot.

5. **Configure Slack and Test**:
   - Set up your Slack App with the appropriate Redirect URL.
   - Invite your Slackbot to desired channels.
   - Test your Slackbot using the Render-provided live URL.

### Deploying on AWS

1. **Set Up an AWS Account**: Sign up for an AWS account on [AWS](https://aws.amazon.com/).

2. **Launch an EC2 Instance**:
   - Use a Linux-based Amazon Machine Image (AMI).
   - Configure security groups to allow traffic on the bot's port.
   - Create and associate a key pair for access.

3. **Connect to Your EC2 Instance**: Use SSH to connect and upload your Slackbot code.

4. **Install Docker**:
   - Update the instance and install Docker.
   - Build and run your Slackbot container.

5. **Set Up a Domain (Optional)**: Configure Route 53 or another domain registrar to point to your EC2 instance's public IP.

6. **Configure Slack and Test**:
   - Set up your Slack App with the appropriate Redirect URL.
   - Invite your Slackbot to desired channels.
   - Test your Slackbot using a custom domain or the EC2 instance's public IP.

### Deploying on Heroku

1. **Create a Heroku Account**: Sign up for a Heroku account at [Heroku](https://www.heroku.com/).

2. **Install the Heroku CLI**: Download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

3. **Prepare Your Slackbot**:
   - Ensure you have a `Procfile` with appropriate content.

4. **Deploy to Heroku**:
   - Open a terminal in your Slackbot directory.
   - Log in to Heroku using `heroku login`.
   - Create a new Heroku app using `heroku create`.
   - Deploy your Slackbot with Git.

5. **Configure Slack and Test**:
   - Set up your Slack App with the correct Redirect URL.
   - Invite your Slackbot to desired channels.
   - Test your Slackbot using the Heroku app's URL.

Choose the platform that best suits your needs and configuration preferences.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Chimoney](https://chimoney.io/) for their financial services integration.
