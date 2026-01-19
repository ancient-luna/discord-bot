const { ChannelType } = require("discord.js");

module.exports = new Object({
    name: "messageCreate",

    async execute(client, message) {
        if (message.channel.type === ChannelType.DM) return;
        if (message.channel.id !== client.config.countingChannel) return;

        const content = message.content.trim();

        if (!/^\d+$/.test(content)) {
            if (message.deletable) await message.delete().catch(() => { });
            return;
        }

        const number = parseInt(content);

        const messages = await message.channel.messages.fetch({ limit: 2 });
        const previousMessage = messages.filter(m => m.id !== message.id).first();

        let currentNumber = 0;
        let lastUserId = null;

        if (previousMessage) {
            const prevContent = previousMessage.content.trim();
            if (/^\d+$/.test(prevContent)) {
                currentNumber = parseInt(prevContent);
                lastUserId = previousMessage.author.id;
            }
        }

        if (number !== currentNumber + 1) {
            if (message.deletable) await message.delete().catch(() => { });
            return;
        }

        const roleId = client.config.topCounter;
        if (!roleId) return;

        const guild = message.guild;
        const role = guild.roles.cache.get(roleId);
        if (!role) return;

        if (lastUserId !== message.author.id) {
            role.members.forEach(async (member) => {
                if (member.id !== message.author.id) {
                    await member.roles.remove(role, "New top counter took over").catch(() => { });
                }
            });

            try {
                if (!message.member.roles.cache.has(roleId)) {
                    await message.member.roles.add(role, "Currently the top counter");
                }
            } catch (err) {
                console.error("Failed to add role to current counter:", err);
            }
        }
    },
});
