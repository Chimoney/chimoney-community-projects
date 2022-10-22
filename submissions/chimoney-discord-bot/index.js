require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { loadCommands } = require("./utils/helpers");

const client = new Client({ intents: GatewayIntentBits.Guilds });
loadCommands(client);

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
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing ${interaction.commandName}`);
    console.error(error);
  }
});

client.login(process.env.BOT_TOKEN);
