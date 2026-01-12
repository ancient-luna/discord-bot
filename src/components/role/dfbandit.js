module.exports = {
    name: "dfbandit",
    id: "btn-dfbandit",
    permissions: {
        client: [],
        user: [],
        dev: false,
    },

    execute: async (client, interaction) => {
        const role = interaction.guild.roles.cache.get(client.config.dfBanditRole);
        if (!role) return;

        if (interaction.member.roles.cache.has(role.id)) {
            await interaction.member.roles.remove(role);
            await interaction.reply({
                content: `<@&${role.id}> role **removed** <:al_levatio:1376685304005525585>`,
                ephemeral: true,
            });
        } else {
            await interaction.member.roles.add(role);
            await interaction.reply({
                content: `<@&${role.id}> role **given** <:al_levatio:1376685304005525585>`,
                ephemeral: true,
            });
        }
    },
};