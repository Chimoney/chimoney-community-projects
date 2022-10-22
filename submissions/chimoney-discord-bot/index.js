require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { loadCommands } = require("./utils/helpers");

const client = new Client({ intents: GatewayIntentBits.Guilds });
loadCommands(client);

client.once("ready", () => {
  console.log("bot logged in");
});

client.login(process.env.BOT_TOKEN);
