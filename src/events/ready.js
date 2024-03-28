const { presenceHandler } = require("../handlers");
require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const path = require("path");
/**
 * @param {import("../index")} client
 * @param {import("discord.js").Message} message
 * @param {import("discord.js").GuildMember} member
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
    const getCommands = client.slashCommands.map((x) => x); try {
      await client.application.commands.set(getCommands);
      client.console.log(`Loaded ${getCommands.length} Slash Commands!`, "cmd")
    } catch (err) {
      client.console.log(err, "error");
    }
    
    client.console.log(`Logged in as ${client.user.tag}`, "api");
  },
});