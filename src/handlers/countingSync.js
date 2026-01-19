const { ChannelType } = require("discord.js");

module.exports = async (client) => {
    const channelId = client.config.countingChannel;
    if (!channelId) return;

    try {
        const channel = await client.channels.fetch(channelId);
        if (!channel || channel.type !== ChannelType.GuildText) return;

        const messages = await channel.messages.fetch({ limit: 50 });
        const sortedMessages = [...messages.values()].sort((a, b) => b.createdTimestamp - a.createdTimestamp); // Newest first

        let lastValidUserId = null;

        for (const msg of sortedMessages) {
            if (msg.author.bot) continue;
            if (/^\d+$/.test(msg.content.trim())) {
                lastValidUserId = msg.author.id;
                break;
            }
        }

        const roleId = client.config.topCounter;
        if (roleId && lastValidUserId) {
            const guild = channel.guild;
            const role = guild.roles.cache.get(roleId);
            if (role) {
                for (const [id, member] of role.members) {
                    if (id !== lastValidUserId) await member.roles.remove(role).catch(() => { });
                }
                const lastUser = await guild.members.fetch(lastValidUserId).catch(() => null);
                if (lastUser && !lastUser.roles.cache.has(roleId)) {
                    await lastUser.roles.add(role).catch(() => { });
                }
                client.console.log(`Synced 'Top Counter' role to user ${lastValidUserId}`);
            }
        }

    } catch (err) {
        client.console.log(`Error syncing counting channel: ${err.message}`, "error");
    }
};
