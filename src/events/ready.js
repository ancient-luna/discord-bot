const { presenceHandler } = require("../handlers");
require("dotenv").config();
const express = require("express");
const app = express();

const { REST, Routes } = require('discord.js');
const { config } = require("process");
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID; 

/**
 * @param {import("../index")} client
 */
module.exports = new Object({
  name: "ready",
  /**
   * @param {import("../index")} client
   */
  async execute(client) {
    // Update Bot Presence
    if (client.config.PRESENCE.ENABLED) {
      presenceHandler(client);
    }

    app.get("/", (req, res) => {
      res.send("Hello world");
    });
    app.listen(8080);

    // Deploying slash command
    const getCommands = client.slashCommands.map((x) => x);
    try {
      await client.application.commands.set([]); // Clear existing global commands
      await client.application.commands.set(getCommands); // Set new commands
      client.console.log(`Loaded: ${getCommands.length}`, "scmd");
    } catch (err) {
      client.console.log(err, "error");
    }

    async function deleteCommands() {
      const commandIds = [
        '1112308063395926026',
        '1112308063395926027'
      ];

      try {
        for (const commandId of commandIds) {
          await rest.delete(Routes.applicationGuildCommand(clientId, guildId, commandId));
          console.log(`Deleted command ${commandId}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    await deleteCommands();
    
    client.console.log(`Logged in as ${client.user.tag}`, "client");
  },
});
