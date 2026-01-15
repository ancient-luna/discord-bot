const { EmbedBuilder } = require("discord.js");

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

        if (interaction.member.roles.cache.has(role.id)) {
            await interaction.member.roles.remove(role);
            const embed = new EmbedBuilder()
                .setDescription(`<:srv_deny:1334881089205829674> <@&${role.id}> role **removed** <:al_levatio:1376685304005525585>`)
                .setColor('Red');
            await interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        } else {
            await interaction.member.roles.add(role);
            const embed = new EmbedBuilder()
                .setDescription(`<:srv_accept:1334881070449164378> <@&${role.id}> role **given** <:al_levatio:1376685304005525585>`)
                .setColor('Green');
            await interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }
    },
};
