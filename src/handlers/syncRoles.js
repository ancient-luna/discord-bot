module.exports = {
    async syncMemberRoles(member) {
        const { client } = member;
        const server = member.guild;
        
        if (server.id !== client.config.ancientLunaServer) return;

        const luxcastaRole = client.config.luxcastaRole;
        if (!luxcastaRole) return;

        if (member.user.bot) return;

        const roleCount = member.roles.cache.filter(role => role.id !== server.id).size;
        
        if (roleCount === 0 && !member.roles.cache.has(luxcastaRole)) {
            try {
                await member.roles.add(luxcastaRole);
            } catch (err) {
                client.console.log(`Failed to add luxcastaRole to ${member.user.tag}: ${err.message}`, "error");
            }
        }
    },

    async syncAllRoles(client) {
        const server = client.guilds.cache.get(client.config.ancientLunaServer);
        if (!server) return;

        try {
            const members = await server.members.fetch();
            const total = members.size;
            let count = 0;
            
            for (const [id, member] of members) {
                await this.syncMemberRoles(member);
                count++;
                
                if (count % 20 === 0 || count === total) {
                    if (count % 20 === 0 && count !== total) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
            }
            client.console.log(`Synced: ${total} (D)`, "role");
        } catch (err) {
            client.console.log(`Error fetching members for role sync: ${err.message}`, "error");
        }
    }
};