const { syncMemberTagRoles } = require("../../handlers/syncTagRoles");

module.exports = {
    name: "userUpdate",

    async execute(client, oldUser, newUser) {
        const config = client.config;
        const guildsToSync = [config.lunaServer, config.celestuneServer].filter(id => id);

        try {
            const userProfile = await newUser.fetch(true).catch(() => null);
            if (!userProfile) return;

            for (const guildId of guildsToSync) {
                const guild = client.guilds.cache.get(guildId);
                if (!guild) continue;

                const member = await guild.members.fetch(newUser.id).catch(() => null);
                if (member) {
                    await syncMemberTagRoles(member, userProfile);
                }
            }
        } catch (err) {
            client.console.log(`Error in guildMemberTag event: ${err.message}`, "error");
        }
    }
};
