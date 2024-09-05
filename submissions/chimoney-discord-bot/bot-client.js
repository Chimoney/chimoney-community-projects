const { Client, GatewayIntentBits } = require("discord.js");
const { loadCommands } = require("./utils/helpers");

// Instantiate new client
const client = new Client({ intents: GatewayIntentBits.Guilds });
loadCommands(client);

module.exports = client;
