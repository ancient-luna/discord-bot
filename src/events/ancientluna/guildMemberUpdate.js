const { syncMemberRoles } = require("../../handlers/syncRoles");

module.exports = {
    name: "guildMemberUpdate",
    /**
     * @param {import("../../index")} client
     * @param {import("discord.js").GuildMember} oldMember
     * @param {import("discord.js").GuildMember} newMember
     */
    async execute(client, oldMember, newMember) {
        if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
            if (newMember.guild.id !== client.config.ancientLunaServer) return;
            await syncMemberRoles(newMember);
        }
    }
};
