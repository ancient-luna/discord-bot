const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, MessageFlags } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "guildbanner",
  id: "btn-guildbanner",
  permissions: {
    client: [],
    user: [],
    dev: false,
  },
  
  execute: async (client, interaction) => {
    const SRCguildbanner = new AttachmentBuilder("src/assets/bdo/gbanner.png")
    return interaction.reply({
        files: [SRCguildbanner],
        flags: MessageFlags.Ephemeral,
    });
  },
};
