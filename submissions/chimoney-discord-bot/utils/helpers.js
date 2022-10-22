const { Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

function loadCommands(client) {
  // Append commands property to client object
  client.commands = new Collection();

  const commandsPath = path.join(path.dirname(__dirname), "commands");

  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

module.exports = {
  loadCommands,
};
