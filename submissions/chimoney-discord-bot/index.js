require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: GatewayIntentBits.Guilds });

client.once("ready", () => {
  console.log("bot logged in");
});

client.login(process.env.BOT_TOKEN);
