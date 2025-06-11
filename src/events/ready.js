const { presenceHandler, reminderHandler } = require("../handlers");
const syncRolesHandler = require("../handlers/syncRoles");
require("dotenv").config();
const express = require("express");
const app = express();

module.exports = new Object({
  name: "ready",
  once: true,
  /**
   * @param {import("../index")} client
   */
  async execute(client) {

    if (client.config.PRESENCE.ENABLED) presenceHandler(client);

    app.get("/", (req, res) => res.send("Hello world"));
    app.listen(8080);

    const getCommands = client.slashCommands.map((x) => x.data.toJSON());
    await client.application.commands.set([]);
    await client.application.commands.set(getCommands);

    client.console.log(`Loaded: ${getCommands.length}`, "scmd");
    client.console.log(`Logged in as ${client.user.tag}`, "client");

    reminderHandler(client);
    await syncRolesHandler(client);

    setInterval(() => syncRolesHandler(client), 5 * 60 * 1000);
  },
});