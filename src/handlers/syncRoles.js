module.exports = async function syncRolesHandler(client) {
    const lunaServer = client.guilds.cache.get(client.config.ancientLunaServer);
    const lunaGuild = client.guilds.cache.get(client.config.ancientLunaGuild);
    const radianceRole = client.config.radianceRole;
    const luminanceRole = client.config.luminanceRole;
    const dalumiRole = client.config.dalumiRole;

    const lightSeekerRole = client.config.memberRole;
    const lunarDiscipleRole = client.config.lunarDiscipleRole;
    const levatioRole = client.config.levatioRole;

    const ogRole = client.config.ogRole;
    const loyaltiesRole = client.config.loyaltiesRole;

    if (!lunaServer || !lunaGuild) return;

    const membersServer = await lunaServer.members.fetch();
    const membersGuild = await lunaGuild.members.fetch();

    for (const [id, memberServer] of membersServer) {
        const memberGuild = membersGuild.get(id);
        if (!memberGuild) continue;

        const hasServerRoles = memberServer.roles.cache.has(radianceRole) || memberServer.roles.cache.has(luminanceRole);
        const hasGuildRoles = memberGuild.roles.cache.has(dalumiRole);

        if (hasServerRoles && !hasGuildRoles) await memberGuild.roles.add(dalumiRole).catch(() => { });
        else if (!hasServerRoles && hasGuildRoles) await memberGuild.roles.remove(dalumiRole).catch(() => { });

        // For OG and Loyalties role reward in server
        const inGuild = !!memberGuild;
        const hasLightSeeker = memberServer.roles.cache.has(lightSeekerRole);
        const hasLunarDisciple = memberServer.roles.cache.has(lunarDiscipleRole);
        const hasLevatio = memberServer.roles.cache.has(levatioRole);
        const hasOG = memberServer.roles.cache.has(ogRole);
        const hasLoyalties = memberServer.roles.cache.has(loyaltiesRole);

        if (inGuild && hasLightSeeker && !hasOG) await memberServer.roles.add(ogRole).catch(() => {});
        if (inGuild && (hasLunarDisciple || hasLevatio) && !hasLoyalties) await memberServer.roles.add(loyaltiesRole).catch(() => {});
    }
};