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
        let channel = member.guild.channels.cache.get(client.config.gatewayChannel);
        if (!channel) {
            channel = await member.guild.channels.fetch(client.config.gatewayChannel).catch(console.error);
            if (!channel) return;
        }
        const leavingText = new EmbedBuilder()
            .setDescription(`The lights get dimmed! **${member.displayName}** leaving the sanctuary`)
            .setFooter({ text: `${member.user.id} (u) ${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 512 }) })
            .setColor('Red')
            .setTimestamp();
        return channel.send({ embeds: [leavingText] })
    }
})