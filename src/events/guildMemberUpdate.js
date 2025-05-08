module.exports = new Object({
    name: "guildMemberUpdate",
    /**
     * @param {import("../index")} client
     * @param {import('discord.js').GuildMember|import('discord.js').PartialGuildMember} member
     */
    async execute(client, oldMember, newMember) {
        const {
            ancientLunaServer,
            ancientLunaGuild,
            radianceRole,
            luminanceRole,
            dalumiRole,
            memberRole: lightSeekerRole,
            lunarDiscipleRole,
            levatioRole,
            ogRole,
            loyaltiesRole,
        } = client.config;

        if (newMember.guild.id !== ancientLunaServer) return;

        const lunaGuild = client.guilds.cache.get(ancientLunaGuild);
        if (!lunaGuild) return;

        const memberGuild = await lunaGuild.members.fetch(newMember.id).catch(() => null);
        if (!memberGuild) return;

        const hadDalumi = oldMember.roles.cache.has(radianceRole) || oldMember.roles.cache.has(luminanceRole);
        const hasDalumi = newMember.roles.cache.has(radianceRole) || newMember.roles.cache.has(luminanceRole);

        if (hadDalumi !== hasDalumi) {
            if (hasDalumi) {
                await memberGuild.roles.add(dalumiRole).catch(() => {});
            } else {
                await memberGuild.roles.remove(dalumiRole).catch(() => {});
            }
        }

        // OG & Loyalties sync
        const hasLightSeeker = newMember.roles.cache.has(lightSeekerRole);
        const hasLunarDisciple = newMember.roles.cache.has(lunarDiscipleRole);
        const hasLevatio = newMember.roles.cache.has(levatioRole);
        const hasOG = newMember.roles.cache.has(ogRole);
        const hasLoyalties = newMember.roles.cache.has(loyaltiesRole);

        if (inGuild && hasLightSeeker && !hasOG) await newMember.roles.add(ogRole).catch(() => {});
        if (inGuild && (hasLunarDisciple || hasLevatio) && !hasLoyalties) await newMember.roles.add(loyaltiesRole).catch(() => {});
    }
});