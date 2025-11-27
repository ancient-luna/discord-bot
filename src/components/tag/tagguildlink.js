const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "tagguildlink",
  id: "btn-tagguildlink",
  permissions: {
    client: [],
    user: [],
    dev: false,
  },
  
  execute: async (client, interaction) => {
    return interaction.reply({
      content: 'https://discord.gg/XJCtfTPBfu',
      flags: MessageFlags.Ephemeral,
    });
  },
};
