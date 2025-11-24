const { syncMemberTagRoles } = require("../../handlers/syncTagRoles");

module.exports = {
    name: "userUpdate",
    /**
     * @param {import("../../index")} client
     * @param {import("discord.js").User} oldUser
     * @param {import("discord.js").User} newUser
     */
    async execute(client, oldUser, newUser) {
        const ancientLunaServerId = client.config.ancientLunaServer;
        const guild = client.guilds.cache.get(ancientLunaServerId);
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
