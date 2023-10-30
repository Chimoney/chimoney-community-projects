# Chimoney Github Bot


The Environment variables (.env) file contains:

- `PORT`: Port on which the bot's HTTP server will run.
- `BOT_URL`: Your github bot's URL.
- `API_KEY`: Your API key for Chimoney integration.
- `REDIRECT_URL`: Redirect URL for Chimoney transactions.
- `CHIMONEY_BASE_URL`: Base URL for Chimoney operations.
- `CHIMONEY_BASE_HOST`: Chimoney base host URL.
- `DEFAULT_EMAIL`: Default email to receive transactions updates.

## Installation

1. Clone the repo:

   ```shell
   git clone https://github.com/amosayomide05/chimoney-community-projects.git
   ```

2. Install the dependencies:

   ```shell
   cd chimoney-community-projects && cd github-bot
   npm install
   ```

3. Edit the `.env` file and add the required environment variables.

4. Start the bot:

   ```shell
   node index.js
   ```

## Usage


### Sending Chimoney

In an issue or pull request, use the below command to send Chimoney to a user:

```
/chimoney_pay @username amount
```

Replace `@username` with the recipient's github username and `amount` with the desired amount of Chimoney.

### Receiving Chimoney
When you receive Chimoney, the bot will send recipient an email with a link to claim the Chimoney.

### To run the bot

It first has to be published to github action marketplace.

Then it can be used like this:

on: issue_comment 
  
 name: Chimoney 
  
 permissions: 
   issues: write 
   contents: read 
  
 jobs: 
     runs-on: ubuntu-latest 
     strategy: 
       matrix: 
         node-version: [18.x] 
  
     steps: 
       - name: Check for Command 
         id: command 
         uses: chimoney/github-chimoney-bot@v1
            env:
          PORT: ${{ secrets.PORT }}
          BOT_URL: ${{ secrets.BOT_URL }}
          API_KEY: ${{ secrets.API_KEY }}
          REDIRECT_URL: ${{ secrets.REDIRECT_URL }}
          CHIMONEY_BASE_URL: ${{ secrets.CHIMONEY_BASE_URL }}
          CHIMONEY_BASE_HOST: ${{ secrets.CHIMONEY_BASE_HOST }}
          DEFAULT_EMAIL: ${{ secrets.DEFAULT_EMAIL }}
           
In the GitHub repository, go to the "Settings" tab then select "Secrets."
Click on the "New repository secret" button for each of the environment variables used in the workflow. Name them exactly as used in the workflow YML file.

