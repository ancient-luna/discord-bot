const { syncMemberRoles } = require("../../handlers/syncRoles");

module.exports = {
    name: "guildMemberUpdate",

    async execute(client, oldMember, newMember) {
        if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
            if (newMember.guild.id !== client.config.lunaServer) return;
            await syncMemberRoles(newMember);
        }
    }
};
