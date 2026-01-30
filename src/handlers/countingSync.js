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

        for (let i = 0; i < sortedMessages.length; i++) {
            const msg = sortedMessages[i];
            if (msg.author.bot) continue;
            const content = msg.content.trim();
            if (!/^\d+$/.test(content)) continue;

            let isTurnValid = true;
            for (let j = i + 1; j < sortedMessages.length; j++) {
                const prevMsg = sortedMessages[j];
                if (prevMsg.author.bot) continue;
                if (/^\d+$/.test(prevMsg.content.trim())) {
                    if (prevMsg.author.id === msg.author.id) {
                        isTurnValid = false;
                    }
                    break;
                }
            }

            if (isTurnValid) {
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
