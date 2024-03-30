const { EmbedBuilder } = require("discord.js");

module.exports = new Object({
    name: "guildMemberUpdate",
    /**
     * @param {import("../index")} client
     * @param {import('discord.js').GuildMember|import('discord.js').PartialGuildMember} oldMember
     * @param {import('discord.js').GuildMember|import('discord.js').PartialGuildMember} newMember
     */
    async execute(client, oldMember, newMember) {
        const isOldStreamingYouTube = oldMember.presence.activities.some(activity =>
            activity.type === 'STREAMING' && activity.name.toLowerCase().includes('youtube')
        );
        
        const isNewStreamingYouTube = newMember.presence.activities.some(activity =>
            activity.type === 'STREAMING' && activity.name.toLowerCase().includes('youtube')
        );

        if (isNewStreamingYouTube && !isOldStreamingYouTube) {
            const role = newMember.guild.roles.cache.get(client.config.streamRole);
            await newMember.roles.add(role).catch((err) => console.error('Error adding role:', err));

            const channel = newMember.guild.channels.cache.get(client.config.logChannel);
            const message = new EmbedBuilder()
                .setTitle("Temporary Role Assigned")
                .setDescription(`${newMember.user.tag} is streaming on YouTube. Temporary role assigned.`)
                .setColor(client.config.embedColorTrans);
            return channel.send({ embeds: [message] });

        } else if (!isNewStreamingYouTube && isOldStreamingYouTube) {
            const role = newMember.guild.roles.cache.get(client.config.streamRole);
            await newMember.roles.remove(role).catch((err) => console.error('Error removing role:', err));

            const channel = newMember.guild.channels.cache.get(client.config.logChannel);
            const message = new EmbedBuilder()
                .setTitle("Temporary Role Removed")
                .setDescription(`${newMember.user.tag} stopped streaming on YouTube. Temporary role removed.`)
                .setColor(client.config.embedColorTrans);
            return channel.send({ embeds: [message] });
        }
    }
})