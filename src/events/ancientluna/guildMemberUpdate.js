const { syncMemberRoles } = require("../../handlers/syncRoles");

module.exports = {
    name: "guildMemberUpdate",
    /**
     * @param {import("../../index")} client
     * @param {import("discord.js").GuildMember} oldMember
     * @param {import("discord.js").GuildMember} newMember
     */
    async execute(client, oldMember, newMember) {
        // Only check if roles have changed
        if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
            // Ensure we are in the correct server
            if (newMember.guild.id !== client.config.ancientLunaServer) return;
            await syncMemberRoles(newMember);
        }
    }
};
