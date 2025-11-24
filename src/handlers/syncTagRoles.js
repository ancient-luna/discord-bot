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

        client.console.log("Starting tag role initialization...", "client");

        // Run in background to avoid blocking
        (async () => {
            try {
                const role = guild.roles.cache.get(nocturnaRole);
                if (!role) {
                    client.console.log(`Role with ID ${nocturnaRole} not found`, "error");
                    return;
                }

                // PHASE 1: Quick Cleanup
                // Check members who ALREADY have the role.
                client.console.log('Phase 1: Checking existing role holders...', "client");
                const membersWithRole = role.members;
                let removedCount = 0;
                
                for (const [memberId, member] of membersWithRole) {
                    if (member.user.bot) continue;
                    
                    try {
                        // Force fetch to get primaryGuild
                        const user = await member.user.fetch(true);
                        const hasTargetPrimaryGuild = user.primaryGuild && 
                                                    user.primaryGuild.identityGuildId === ancientLunaServerId &&
                                                    user.primaryGuild.tag === "LUNA";
                        
                        if (!hasTargetPrimaryGuild) {
                            await member.roles.remove(role);
                            client.console.log(`[Startup] Removed role from ${member.user.tag} (no longer has tag)`, "role");
                            removedCount++;
                        }
                    } catch (err) {
                        client.console.log(`Error checking member ${member.user.tag}: ${err.message}`, "error");
                    }
                    // Small delay
                    await new Promise(r => setTimeout(r, 100)); 
                }
                client.console.log(`Phase 1 Complete. Removed roles from ${removedCount} members.`, "client");

                // PHASE 2: Background Scan
                // Check ALL members to find those who SHOULD have the role but don't.
                client.console.log('Phase 2: Starting background scan for missing roles...', "client");
                
                const allMembers = await guild.members.fetch();
                const memberArray = Array.from(allMembers.values());
                const batchSize = 20;
                let assignedCount = 0;
                let errorCount = 0;
                
                client.console.log(`Scanning ${memberArray.length} members in background...`, "client");
                
                for (let i = 0; i < memberArray.length; i += batchSize) {
                    const batch = memberArray.slice(i, i + batchSize);
                    
                    // Process batch
                    await Promise.all(batch.map(async (member) => {
                        if (member.user.bot) return;
                        if (member.roles.cache.has(nocturnaRole)) return; // Already checked in Phase 1 or has role
                        
                        try {
                            // Fetch user to get primaryGuild
                            const user = await member.user.fetch(true);
                            const hasTargetPrimaryGuild = user.primaryGuild && 
                                                    user.primaryGuild.identityGuildId === ancientLunaServerId &&
                                                    user.primaryGuild.tag === "LUNA";

                            if (hasTargetPrimaryGuild) {
                                await member.roles.add(role);
                                client.console.log(`[Startup] Assigned role to ${member.user.tag}`, "role");
                                assignedCount++;
                            }
                        } catch (error) {
                            if (error.code !== 50035) errorCount++; // Ignore invalid user errors
                        }
                    }));

                    // Log progress
                    if ((i + batchSize) % 1000 < batchSize) {
                        process.stdout.write(`\r• [ Client ]    => [Background Scan] Processed ${Math.min(i + batchSize, memberArray.length)}/${memberArray.length} members...`);
                    }
                    
                    // Significant delay between batches
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
                
                process.stdout.write("\n");
                client.console.log(`Tag role sync complete: ${assignedCount} assigned, ${removedCount} removed.`, "client");
                
            } catch (error) {
                client.console.log(`Error during tag role initialization: ${error.message}`, "error");
            }
        })();
    }
};
