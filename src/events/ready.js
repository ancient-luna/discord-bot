const { presenceHandler, reminderHandler } = require("../handlers");
require("dotenv").config();
const express = require("express");
const app = express();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

module.exports = new Object({
  name: "ready",
  
  /**
   * @param {import("../index")} client
   */

  async execute(client) {

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
    
    client.console.log(`Logged in as ${client.user.tag}`, "client");

    reminderHandler(client); // load reminders
  },
});