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
            .setDescription(`The lights get dimmed! **${member.displayName}** leaving the sanctuary`)
            .setFooter({ text: `ID: ${member.user.id} // ${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 512 }) })
            .setColor('Red')
            .setTimestamp();
        return channel.send({ embeds: [leavingText] })
    }
})