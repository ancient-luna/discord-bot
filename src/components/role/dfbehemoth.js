const { ContainerBuilder, TextDisplayBuilder, MessageFlags } = require("discord.js");

module.exports = {
    name: "dfbehemoth",
    id: "btn-dfbehemoth",
    permissions: {
        client: [],
        user: [],
        dev: false,
    },

    execute: async (client, interaction) => {
        const role = interaction.guild.roles.cache.get(client.config.dfBehemothRole);
        if (!role) return;
        const container = new ContainerBuilder()
        if (interaction.member.roles.cache.has(role.id)) {
            await interaction.member.roles.remove(role);
            const text = new TextDisplayBuilder().setContent(`<:srv_denied:1334885383636521050> <@&${role.id}> role **removed** <:al_levatio:1376685304005525585>`)
            container.addTextDisplayComponents(text)
            await interaction.reply({
                flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
                components: [container],
            });
        } else {
            await interaction.member.roles.add(role);
            const text = new TextDisplayBuilder().setContent(`<:srv_accepted:1334885365676507188> <@&${role.id}> role **given** <:al_levatio:1376685304005525585>`)
            container.addTextDisplayComponents(text)
            await interaction.reply({
                flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
                components: [container],
            });
        }
    },
};
