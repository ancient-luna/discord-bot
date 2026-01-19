const { ChannelType } = require("discord.js");

module.exports = async (client) => {
    const channelId = client.config.countingChannel;
    if (!channelId) return;

    try {
        const channel = await client.channels.fetch(channelId);
        if (!channel || channel.type !== ChannelType.GuildText) return;

        const messages = await channel.messages.fetch({ limit: 100 });
        const sortedMessages = [...messages.values()].sort((a, b) => a.createdTimestamp - b.createdTimestamp);

        let dbNumber = await client.db.get("counting_last_number") || 0;
        let dbUserId = await client.db.get("counting_last_user_id");

        let latestValidMsg = null;
        for (let i = sortedMessages.length - 1; i >= 0; i--) {
            const msg = sortedMessages[i];
            if (msg.author.bot) continue;

            const content = msg.content.trim();
            if (/^\d+$/.test(content)) {
                latestValidMsg = msg;
                break;
            }
        }

        if (latestValidMsg) {
            const latestNumber = parseInt(latestValidMsg.content.trim());
            // Ensure dbNumber is treated as int for comparison
            dbNumber = parseInt(dbNumber) || 0;

            if (latestNumber !== dbNumber || latestValidMsg.author.id !== dbUserId) {
                dbNumber = latestNumber;
                dbUserId = latestValidMsg.author.id;

                await client.db.set("counting_last_number", dbNumber);
                await client.db.set("counting_last_user_id", dbUserId);
                client.console.log(`Counting system FORCE synced to ${dbNumber} from message history.`);
            }
        }

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
