const { EmbedBuilder } = require("discord.js");

module.exports = new Object({
    name: "guildMemberRemove",
    /**
     * @param {import("../index")} client
     * @param {import('discord.js').GuildMember|import('discord.js').PartialGuildMember} member
     */
    async execute(client, member) {
        if (member.partial) await member.user.fetch();
        if (!member.guild) return;
        const { guild } = member;
        const channel = guild.channels.cache.get(client.config.gatewayChannel);
        const leavingText = new EmbedBuilder()
            .setDescription(`The lights get dimmed! **${member.user.tag}** leaving the sanctuary`)
            .setColor('Red');
        return channel.send({ embeds: [leavingText] })
    }

})
