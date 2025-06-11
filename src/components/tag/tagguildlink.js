const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "tagguildlink",
  id: "btn-tagguildlink",
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
      content: 'https://discord.gg/XJCtfTPBfu',
      flags: MessageFlags.Ephemeral,
    });
  },
};
