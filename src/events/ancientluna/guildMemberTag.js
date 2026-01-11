const { syncMemberTagRoles } = require("../../handlers/syncTagRoles");

module.exports = {
    name: "userUpdate",

    async execute(client, oldUser, newUser) {
        const lunaServerId = client.config.lunaServer;
        const guild = client.guilds.cache.get(lunaServerId);
        if (!guild) return;

        try {
            const member = await guild.members.fetch(newUser.id).catch(() => null);
            if (!member) return;

            const userProfile = await newUser.fetch(true).catch(() => null);
            if (member && userProfile) {
                await syncMemberTagRoles(member, userProfile);
            }
        } catch (err) {
            client.console.log(`Error in guildMemberTag event: ${err.message}`, "error");
        }
    }
};
