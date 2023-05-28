const { EmbedBuilder } = require("discord.js");
const { greetingHandler } = require('../handlers');


module.exports = new Object({
    name: "guildMemberAdd",
    /**
     * @param {import("../index")} client
     * @param {import('discord.js').GuildMember|import('discord.js').PartialGuildMember} member
     */
    async execute(member) {
        if (!member || !member.guild) return;
        greetingHandler.sendWelcome(member);
    }
})

