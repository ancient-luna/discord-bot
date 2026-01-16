const { ChannelType } = require("discord.js");

module.exports = async (client) => {
    const channelId = client.config.countingChannel;
    if (!channelId) return;

    try {
        const channel = await client.channels.fetch(channelId);
        if (!channel || channel.type !== ChannelType.GuildText) return;

        const messages = await channel.messages.fetch({ limit: 100 });

        let lastValidNumber = 0;
        let lastValidUserId = null;
        let messagesToDelete = [];
        let foundValidStart = false;

        let dbNumber = await client.db.get("counting_last_number") || 0;
        let dbUserId = await client.db.get("counting_last_user_id");

        const sortedMessages = [...messages.values()].sort((a, b) => a.createdTimestamp - b.createdTimestamp);

        for (const msg of sortedMessages) {
            if (msg.author.bot) continue;

            const content = msg.content.trim();
            const number = parseInt(content);

            if (/^\d+$/.test(content) && number === dbNumber + 1) {
                dbNumber = number;
                dbUserId = msg.author.id;
                foundValidStart = true;
            } else {
                if (msg.deletable) {
                    messagesToDelete.push(msg);
                }
            }
        }

        if (messagesToDelete.length > 0) {
            if (messagesToDelete.length === 1) {
                await messagesToDelete[0].delete().catch(() => { });
            } else {
                await channel.bulkDelete(messagesToDelete).catch(() => {
                    messagesToDelete.forEach(m => m.delete().catch(() => { }));
                });
            }
            client.console.log(`Cleaned up ${messagesToDelete.length} messy messages in counting channel.`, "info");
        }

        await client.db.set("counting_last_number", dbNumber);
        await client.db.set("counting_last_user_id", dbUserId);

        const roleId = client.config.topCounter;
        if (roleId && dbUserId) {
            const guild = channel.guild;
            const role = guild.roles.cache.get(roleId);
            if (role) {
                const currentHolder = role.members.first();
                if (!currentHolder || currentHolder.id !== dbUserId) {
                    for (const [id, member] of role.members) {
                        if (id !== dbUserId) await member.roles.remove(role).catch(() => { });
                    }
                    const lastUser = await guild.members.fetch(dbUserId).catch(() => null);
                    if (lastUser && !lastUser.roles.cache.has(roleId)) {
                        await lastUser.roles.add(role).catch(() => { });
                    }
                }
            }
        }

    } catch (err) {
        client.console.log(`Error syncing counting channel: ${err.message}`, "error");
    }
};
