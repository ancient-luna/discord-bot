const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "ticketclose",
  id: "btn-ticketclose",
  permissions: {
    client: [],
    user: ['ManageMessages'],
    dev: false,
  },
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  execute: async (client, interaction) => {
    if (!interaction.channel.name.includes('ticket')) return interaction.reply({
      content: `You are not allowed to delete a non-ticket channel`,
      ephemeral: true
    }).catch((e) => { });

    interaction.reply({
        content: `Closing ticket in 5 seconds <a:_util_loading:863317596551118858>`,
        ephemeral: true
    });

    setTimeout(() => {
      interaction.channel.delete().catch((e) => { });
    }, 5000);
  },
};
