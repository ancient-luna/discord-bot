module.exports = {
    async syncMemberTagRoles(member, userProfile = null) {
        const { client } = member;
        const config = client.config;
        const ancientLunaServerId = config.ancientLunaServer;
        const nocturnaRole = config.nocturnaRole;
        if (!nocturnaRole || nocturnaRole === client.config.nocturnaRole) return;
        const user = userProfile || member.user;
        if (!user.primaryGuild) return;

        const { identityGuildId, tag } = user.primaryGuild;
        if (identityGuildId === ancientLunaServerId && tag === "LUNA") {
            if (!member.roles.cache.has(nocturnaRole)) {
                try {
                    await member.roles.add(nocturnaRole);
                    client.console.log(`Added nocturnaRole to ${user.tag}`, "role");
                } catch (err) {
                    client.console.error(`Failed to add nocturnaRole to ${user.tag}: ${err.message}`);
                }
            }
        } else {
            if (member.roles.cache.has(nocturnaRole)) {
                try {
                    await member.roles.remove(nocturnaRole);
                    client.console.log(`Removed nocturnaRole from ${user.tag}`, "role");
                } catch (err) {
                    client.console.error(`Failed to remove nocturnaRole from ${user.tag}: ${err.message}`);
                }
            }
        }
    },

    async syncAllTagRoles(client) {
        const config = client.config;
        const ancientLunaServerId = config.ancientLunaServer;
        const guild = client.guilds.cache.get(ancientLunaServerId);

        if (!guild) {
            client.console.error(`Ancient Luna Server (${ancientLunaServerId}) not found.`);
            return;
        }

        client.console.log("Syncing tag roles...", "client");
        
        try {
            const members = await guild.members.fetch();
            const total = members.size;
            let count = 0;

            for (const [id, member] of members) {
                if (member.user.bot) continue;
                await this.syncMemberTagRoles(member);
                count++;
                
                if (count % 20 === 0 || count === total) {
                    process.stdout.write(`\r• [ Client ]    => Syncing tag roles... [${count}/${total}]`);
                    if (count % 20 === 0) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
            }
            process.stdout.write("\n");
            client.console.log("Synced tag roles", "client");
        } catch (err) {
            client.console.error(`Error fetching members for tag role sync: ${err.message}`);
        }
    }
};
