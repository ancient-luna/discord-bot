const { presenceHandler, reminderHandler, syncRolesHandler, syncTagRolesHandler, radianceScheduler } = require("../handlers");
require("dotenv").config();
const express = require("express");
const app = express();

module.exports = new Object({
  name: "clientReady",
  once: true,
  /**
   * @param {import("../index")} client
   */
  async execute(client) {

    if (client.config.PRESENCE.ENABLED) presenceHandler(client);

    app.get("/", (req, res) => res.send("Hello world"));
    app.listen(8080);

    const getCommands = client.slashCommands.map((x) => x.data.toJSON());
    // await client.application.commands.set([]); // deleting and pre-registering all commands
    await client.application.commands.set(getCommands);
    
    client.console.log(`Logged in as ${client.user.tag}`, "client");

    reminderHandler(client);
    radianceScheduler(client);
    await syncRolesHandler.syncAllRoles(client);
    await syncTagRolesHandler.syncAllTagRoles(client);
  },
});