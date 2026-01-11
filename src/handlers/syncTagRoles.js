module.exports = {
    async syncMemberTagRoles(member, userProfile = null) {
        const { client } = member;
        const config = client.config;
        const lunaServerId = config.lunaServer;
        const lunaTagRole = config.lunaTagRole;

        if (!lunaTagRole) return;

        const user = userProfile || member.user;

        if (!user.primaryGuild) return;

        const { identityGuildId, tag } = user.primaryGuild;

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
    },

    async syncAllTagRoles(client) {
        const config = client.config;
        const lunaServerId = config.lunaServer;
        const lunaTagRole = config.lunaTagRole;
        const guild = client.guilds.cache.get(lunaServerId);

        if (!guild) {
            client.console.log(`Ancient Luna Server (${lunaServerId}) not found.`, "error");
            return;
        }

        if (!lunaTagRole) {
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
                        user.primaryGuild.identityGuildId === lunaServerId &&
                        user.primaryGuild.tag === "LUNA";

                    if (hasTargetPrimaryGuild && !member.roles.cache.has(lunaTagRole)) {
                        await member.roles.add(lunaTagRole);
                    } else if (!hasTargetPrimaryGuild && member.roles.cache.has(lunaTagRole)) {
                        await member.roles.remove(lunaTagRole);
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
            client.console.log(`Synced: ${total} (T)`, "role");
        } catch (err) {
            client.console.log(`Error fetching members for tag role sync: ${err.message}`, "error");
        }
    }
};
