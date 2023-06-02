const { EmbedBuilder, ActionRowBuilder } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "disciple",
  id: "btn-disciple",
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
      content: `test work`,
      ephemeral: true,
    });
  },
};
