module.exports = {
    async syncMemberRoles(member) {
        const { client } = member;
        const server = member.guild;
        
        // Ensure we are in the correct server
        if (server.id !== client.config.ancientLunaServer) return;

        const luxcastaRole = client.config.luxcastaRole;
        if (!luxcastaRole) return;

        if (member.user.bot) return;

        // Count roles excluding @everyone (which has same ID as server)
        const roleCount = member.roles.cache.filter(role => role.id !== server.id).size;
        
        if (roleCount === 0 && !member.roles.cache.has(luxcastaRole)) {
            try {
                await member.roles.add(luxcastaRole);
                client.console.log(`Added luxcastaRole to ${member.user.tag}`, "role");
            } catch (err) {
                client.console.error(`Failed to add luxcastaRole to ${member.user.tag}: ${err.message}`);
            }
        }
    },

    async syncAllRoles(client) {
        const server = client.guilds.cache.get(client.config.ancientLunaServer);
        if (!server) return;
        
        client.console.log("Syncing default roles...", "client");

        try {
            const members = await server.members.fetch();
            let count = 0;
            for (const [id, member] of members) {
                await this.syncMemberRoles(member);
                count++;
                // Batching: Pause for 1 second every 20 members to prevent rate limits
                if (count % 20 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        } catch (err) {
            client.console.error(`Error fetching members for role sync: ${err.message}`);
        }
    }
};