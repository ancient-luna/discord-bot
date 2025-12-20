const { EmbedBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require("discord.js");

module.exports = new Object({
    name: "guildMemberRemove",
    
    async execute(client, member) {
        if (member.partial) await member.user.fetch();
        if (!member.guild) return;
        const channel = member.guild.channels.cache.get(client.config.gatewayChannel);
        if (!channel) return console.log(`[x] ID: ${member.user.id} left from [${member.guild.id}] ${member.guild.name}`);
        const memberAvatar = member.user.displayAvatarURL({ dynamic: true, size: 4096 });
        const container = new ContainerBuilder()
        const textLeave = new TextDisplayBuilder().setContent(`<:ico_leave:1451833368236003378> **${member.displayName}** leaving the sanctuary`);
        const textAccount = new TextDisplayBuilder().setContent(`-# ID: ${member.user.id} [(relic)](${memberAvatar}) ${member.user.username}`);
        container.addTextDisplayComponents(textLeave);
        return channel.send({ flags: MessageFlags.IsComponentsV2, components: [container] })
    }
})