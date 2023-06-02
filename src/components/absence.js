const { EmbedBuilder, ActionRowBuilder } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "absence",
  id: "btn-absence",
  permissions: {
    client: [],
    user: [],
    dev: false,
  },
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  execute: async (client, interaction) => {
    return interaction.reply({
      content: `test2 work`,
      ephemeral: true,
    });
  },
};
