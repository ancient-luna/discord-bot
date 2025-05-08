module.exports = async function syncRolesHandler(client) {
    const lunaServer = client.guilds.cache.get(client.config.ancientLunaServer);
    const lunaGuild = client.guilds.cache.get(client.config.ancientLunaGuild);
    const radianceRole = client.config.radianceRole;
    const luminanceRole = client.config.luminanceRole;
    const dalumiRole = client.config.dalumiRole;
  
    if (!lunaServer || !lunaGuild) return;
  
    const membersServer = await lunaServer.members.fetch();
    const membersGuild = await lunaGuild.members.fetch();
  
    for (const [id, memberServer] of membersServer) {
      const memberGuild = membersGuild.get(id);
      if (!memberGuild) continue;
  
      const hasServerRoles = memberServer.roles.cache.has(radianceRole) || memberServer.roles.cache.has(luminanceRole);
      const hasGuildRoles = memberGuild.roles.cache.has(dalumiRole);
  
      if (hasServerRoles && !hasGuildRoles) await memberGuild.roles.add(dalumiRole).catch(() => {});
      else if (!hasServerRoles && hasGuildRoles) await memberGuild.roles.remove(dalumiRole).catch(() => {});
    }
  };