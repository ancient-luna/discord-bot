const { EmbedBuilder } = require("discord.js");

module.exports = new Object({
    name: "guildMemberRemove",
    /**
     * @param {import("../index")} client
     * @param {import('discord.js').GuildMember|import('discord.js').PartialGuildMember} member
     */
    async execute(client, member) {
        try {
            if (member.partial) await member.user.fetch();
            if (!member.guild) return;
            const channel = await member.guild.channels.fetch(client.config.gatewayChannel).catch(() => null);
            if (!channel || !channel.send) return;
            const leavingText = new EmbedBuilder()
                .setDescription(`The lights get dimmed! **${member.displayName}** leaving the sanctuary`)
                .setFooter({ text: `${member.user.id} (u) ${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 512 }) })
                .setColor('Red')
                .setTimestamp();
            return channel.send({ embeds: [leavingText] })
        } catch (err) {
            console.error("Error in guildMemberRemove:", err);
        }
    }
})