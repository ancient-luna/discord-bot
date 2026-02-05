module.exports = {
    async syncMemberTagRoles(member, userProfile = null) {
        const { client, guild } = member;
        const config = client.config;
        const lunaServerId = config.lunaServer;
        const lunaTagRole = config.lunaTagRole;
        const celestuneServerId = config.celestuneServer;
        const celestuneTagRole = config.celestuneTagRole;

        const user = userProfile || member.user;

        if (!user.primaryGuild) return;

        const { identityGuildId, tag } = user.primaryGuild;

        // Luna Server Tag Sync
        if (guild.id === lunaServerId && lunaTagRole) {
            if (identityGuildId === lunaServerId && tag === "LUNA") {
                if (!member.roles.cache.has(lunaTagRole)) {
                    try {
                        await member.roles.add(lunaTagRole);
                    } catch (err) {
                        client.console.log(`Failed to add lunaTagRole to ${user.tag}: ${err.message}`, "error");
                    }
                }
            } else {
                if (member.roles.cache.has(lunaTagRole)) {
                    try {
                        await member.roles.remove(lunaTagRole);
                    } catch (err) {
                        client.console.log(`Failed to remove lunaTagRole from ${user.tag}: ${err.message}`, "error");
                    }
                }
            }
        }

        // Celestune Server Tag Sync
        if (guild.id === celestuneServerId && celestuneTagRole) {
            if (identityGuildId === celestuneServerId) {
                if (!member.roles.cache.has(celestuneTagRole)) {
                    try {
                        await member.roles.add(celestuneTagRole);
                    } catch (err) {
                        client.console.log(`Failed to add celestuneTagRole to ${user.tag}: ${err.message}`, "error");
                    }
                }
            } else {
                if (member.roles.cache.has(celestuneTagRole)) {
                    try {
                        await member.roles.remove(celestuneTagRole);
                    } catch (err) {
                        client.console.log(`Failed to remove celestuneTagRole from ${user.tag}: ${err.message}`, "error");
                    }
                }
            }
        }
    },

    async syncAllTagRoles(client) {
        const config = client.config;
        const guildsToSync = [
            { id: config.lunaServer, role: config.lunaTagRole, name: 'Ancient Luna' },
            { id: config.celestuneServer, role: config.celestuneTagRole, name: 'Celestune' }
        ];

        for (const target of guildsToSync) {
            if (!target.id || !target.role) continue;

            const guild = client.guilds.cache.get(target.id);
            if (!guild) {
                client.console.log(`${target.name} Server (${target.id}) not found.`, "error");
                continue;
            }

            try {
                const members = await guild.members.fetch();
                const total = members.size;
                let count = 0;

                for (const [id, member] of members) {
                    if (member.user.bot) continue;

                    try {
                        const user = await member.user.fetch(true);
                        await this.syncMemberTagRoles(member, user);
                    } catch (err) {
                    }

                    count++;

                    if (count % 20 === 0 && count !== total) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
                client.console.log(`Synced ${target.name}: ${total} (T)`, "role");
            } catch (err) {
                client.console.log(`Error fetching members for ${target.name} tag role sync: ${err.message}`, "error");
            }
        }
    }
};
