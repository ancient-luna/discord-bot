module.exports = new Object({
    name: "guildMemberUpdate",
    /**
     * @param {import("../index")} client
     * @param {import('discord.js').GuildMember|import('discord.js').PartialGuildMember} member
     */
    async execute(client, oldMember, newMember) {
        const { ancientLunaServer, ancientLunaGuild, radianceRole, luminanceRole, ennoiaRole, dalumiRole } = client.config;
        if (newMember.guild.id !== ancientLunaServer) return;

        const hadRoles = oldMember.roles.cache.has(radianceRole) || oldMember.roles.cache.has(luminanceRole);
        const hasRoles = newMember.roles.cache.has(radianceRole) || newMember.roles.cache.has(luminanceRole);
        if (hadRoles === hasRoles) return;

        const lunaGuild = client.guilds.cache.get(ancientLunaGuild);
        if (!lunaGuild) return;

        const memberGuild = await lunaGuild.members.fetch(newMember.id).catch(() => null);
        if (!memberGuild) return;

        if (hasRoles) await memberGuild.roles.add(dalumiRole).catch(() => {});
        else await memberGuild.roles.remove(dalumiRole).catch(() => {});
    }
});