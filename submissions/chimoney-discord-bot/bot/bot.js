require("dotenv").config();
const { Events } = require("discord.js");
const { Client, GatewayIntentBits } = require("discord.js");
const { loadCommands } = require("./utils/helpers");

// Instantiate new client
const client = new Client({ intents: GatewayIntentBits.Guilds });
loadCommands(client);

client.once("ready", async () => {
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
    console.error(error.message);
  }
});

// Start chimoney bot
client.login(process.env.BOT_TOKEN);
