const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "guildbanner",
  id: "btn-guildbanner",
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
    const SRCguildbanner = new AttachmentBuilder("src/assets/bdo/Gintro.png")
    return interaction.reply({
        files: [SRCguildbanner],
        ephemeral: true
    });
  },
};
