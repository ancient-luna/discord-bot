const { presenceHandler } = require("../handlers");
require('dotenv').config();
const util = require('../utils/index')
const express = require('express')
const app = express();
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

        app.get('/', (req, res) => {
            res.send('Hello world');
        });
        app.listen(8080);

        client.console.log(`Logged in as ${client.user.tag}`, "api");
    }
})





