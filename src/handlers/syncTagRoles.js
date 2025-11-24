module.exports = {
    // Single member sync (used by events)
    async syncMemberTagRoles(member, userProfile = null) {
        const { client } = member;
        const config = client.config;
        const ancientLunaServerId = config.ancientLunaServer;
        const nocturnaRole = config.nocturnaRole;

        if (!nocturnaRole) return;

        // Use provided profile or fallback to member.user
        const user = userProfile || member.user;
        
        // If we don't have primaryGuild, we can't do anything.
        // In the event handler, we force fetch, so this should be populated.
        if (!user.primaryGuild) return;

        const { identityGuildId, tag } = user.primaryGuild;

        // Check conditions: primaryGuild is identityGuild AND tag is "LUNA"
        if (identityGuildId === ancientLunaServerId && tag === "LUNA") {
            if (!member.roles.cache.has(nocturnaRole)) {
                try {
                    await member.roles.add(nocturnaRole);
                    client.console.log(`Added nocturnaRole to ${user.tag}`, "role");
                } catch (err) {
                    client.console.log(`Failed to add nocturnaRole to ${user.tag}: ${err.message}`, "error");
                }
            }
        } else {
            // If conditions not met, remove role if they have it
            if (member.roles.cache.has(nocturnaRole)) {
                try {
                    await member.roles.remove(nocturnaRole);
                    client.console.log(`Removed nocturnaRole from ${user.tag}`, "role");
                } catch (err) {
                    client.console.log(`Failed to remove nocturnaRole from ${user.tag}: ${err.message}`, "error");
                }
            }
        }
    },

    // Bulk sync (used on startup)
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

        client.console.log("Syncing tag roles...", "client");

        try {
            const members = await guild.members.fetch();
            const total = members.size;
            let count = 0;
            
            for (const [id, member] of members) {
                if (member.user.bot) continue;
                
                try {
                    // Force fetch to get primaryGuild
                    const user = await member.user.fetch(true);
                    const hasTargetPrimaryGuild = user.primaryGuild && 
                                                user.primaryGuild.identityGuildId === ancientLunaServerId &&
                                                user.primaryGuild.tag === "LUNA";
                    
                    // Add or remove role based on conditions
                    if (hasTargetPrimaryGuild && !member.roles.cache.has(nocturnaRole)) {
                        await member.roles.add(nocturnaRole);
                    } else if (!hasTargetPrimaryGuild && member.roles.cache.has(nocturnaRole)) {
                        await member.roles.remove(nocturnaRole);
                    }
                } catch (err) {
                    // Silently skip errors during bulk sync
                }
                
                count++;
                
                // Update progress log in-place every 20 members
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
            client.console.log(`Error fetching members for tag role sync: ${err.message}`, "error");
        }
    }
};
