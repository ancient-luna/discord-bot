module.exports = async function syncPreRoles(client) {
    const server = client.guilds.cache.get(client.config.ancientLunaServer);
    if (!server) return;
    const luxcastaRole = client.config.luxcastaRole;
    if (!luxcastaRole) return;
    const members = await server.members.fetch();
    for (const [id, member] of members) {
        if (member.user.bot) continue;
        // Count roles excluding @everyone (which has same ID as server)
        const roleCount = member.roles.cache.filter(role => role.id !== server.id).size;
        if (roleCount === 0 && !member.roles.cache.has(luxcastaRole)) {
            await member.roles.add(luxcastaRole);
        }
    }
};