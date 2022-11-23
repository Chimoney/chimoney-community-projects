require("dotenv").config();
const { Events } = require("discord.js");
const client = require("./bot-client");
const app = require("./app");

client.once("ready", () => {
  console.log("bot logged in");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // Get command
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    // Execute command action
    await command.execute(interaction, client);
  } catch (error) {
    console.error(`Error executing ${interaction.commandName}`);
    console.error(error);
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
  // Start chimoney bot
  client.login(process.env.BOT_TOKEN);
});
