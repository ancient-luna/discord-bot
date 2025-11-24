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
            client.console.log(`[Debug] userUpdate fired for ${newUser.tag}`, "debug");
            
            const member = await guild.members.fetch(newUser.id).catch(() => null);
            if (!member) {
                client.console.log(`[Debug] Member not found in guild`, "debug");
                return;
            }

            const userProfile = await newUser.fetch(true).catch(() => null);
            if (!userProfile) {
                client.console.log(`[Debug] Failed to fetch user profile`, "debug");
                return;
            }

            client.console.log(`[Debug] Fetched profile. primaryGuild: ${JSON.stringify(userProfile.primaryGuild)}`, "debug");

            if (member && userProfile) {
                await syncMemberTagRoles(member, userProfile);
            }
        } catch (err) {
            client.console.error(`Error in guildMemberTag event: ${err.message}`);
        }
    }
};
