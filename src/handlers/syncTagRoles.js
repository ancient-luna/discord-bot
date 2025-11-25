module.exports = {
    async syncMemberTagRoles(member, userProfile = null) {
        const { client } = member;
        const config = client.config;
        const ancientLunaServerId = config.ancientLunaServer;
        const nocturnaRole = config.nocturnaRole;

        if (!nocturnaRole) return;

        const user = userProfile || member.user;
        
        if (!user.primaryGuild) return;

        const { identityGuildId, tag } = user.primaryGuild;

        if (identityGuildId === ancientLunaServerId && tag === "LUNA") {
            if (!member.roles.cache.has(nocturnaRole)) {
                try {
                    await member.roles.add(nocturnaRole);
                } catch (err) {
                    client.console.log(`Failed to add nocturnaRole to ${user.tag}: ${err.message}`, "error");
                }
            }
        } else {
            if (member.roles.cache.has(nocturnaRole)) {
                try {
                    await member.roles.remove(nocturnaRole);
                } catch (err) {
                    client.console.log(`Failed to remove nocturnaRole from ${user.tag}: ${err.message}`, "error");
                }
            }
        }
    },

    async syncAllTagRoles(client) {
        const config = client.config;
        const ancientLunaServerId = config.ancientLunaServer;
        const nocturnaRole = config.nocturnaRole;
        const guild = client.guilds.cache.get(ancientLunaServerId);

        if (!guild) {
            client.console.log(`Ancient Luna Server (${ancientLunaServerId}) not found.`, "error");
            return;
        }

        if (!nocturnaRole) {
            client.console.log("Nocturna Role ID not configured.", "error");
            return;
        }

        try {
            const members = await guild.members.fetch();
            const total = members.size;
            let count = 0;
            
            for (const [id, member] of members) {
                if (member.user.bot) continue;
                
                try {
                    const user = await member.user.fetch(true);
                    const hasTargetPrimaryGuild = user.primaryGuild && 
                                                user.primaryGuild.identityGuildId === ancientLunaServerId &&
                                                user.primaryGuild.tag === "LUNA";
                    
                    if (hasTargetPrimaryGuild && !member.roles.cache.has(nocturnaRole)) {
                        await member.roles.add(nocturnaRole);
                    } else if (!hasTargetPrimaryGuild && member.roles.cache.has(nocturnaRole)) {
                        await member.roles.remove(nocturnaRole);
                    }
                } catch (err) {
                }
                
                count++;
                
                if (count % 20 === 0 || count === total) {
                    if (count % 20 === 0 && count !== total) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
            }
            client.console.log(`Tag roles synced: ${total}`, "role");
        } catch (err) {
            client.console.log(`Error fetching members for tag role sync: ${err.message}`, "error");
        }
    }
};
