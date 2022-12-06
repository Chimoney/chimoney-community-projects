require("dotenv").config();
const { Events } = require("discord.js");
const client = require("./bot-client");

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

// Start chimoney bot
client.login(process.env.BOT_TOKEN);
