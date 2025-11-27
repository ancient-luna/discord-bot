const { EmbedBuilder } = require("discord.js");

module.exports = new Object({
    name: "guildMemberRemove",
    
    async execute(client, member) {
        if (member.partial) await member.user.fetch();
        if (!member.guild) return;
        const channel = member.guild.channels.cache.get(client.config.gatewayChannel);
        if (!channel) return console.log(`❎ ${member.user.globalName} [${member.user.id}] left from ${member.guild.name} [${member.guild.id}]`);
        const leavingText = new EmbedBuilder()
            .setDescription(`The lights get dimmed! **${member.displayName}** leaving the sanctuary`)
            .setFooter({ text: `${member.user.id} (u) ${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 512 }) })
            .setColor('Red')
            .setTimestamp();
        return channel.send({ embeds: [leavingText] })
    }
})