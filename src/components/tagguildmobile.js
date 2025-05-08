const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "tagguildmobile",
  id: "btn-tagguildmobile",
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
    const howTo1 = new EmbedBuilder()
      .setTitle("Ⅰ. Profile")
      .setImage("https://i.imgur.com/aBppeYU.jpeg")
      .setColor("#3c3d4f")

    const howTo2 = new EmbedBuilder()
      .setTitle("Ⅱ. Edit Profile")
      .setImage("https://i.imgur.com/HLd6qzB.jpeg")
      .setColor("#3c3d4f")

    const howTo3 = new EmbedBuilder()
      .setTitle("Ⅲ. Server Tag")
      .setImage("https://i.imgur.com/eG2Vxf9.jpeg")
      .setFooter({ text: '*scroll down until you see the server tag option' })
      .setColor("#3c3d4f")
    
    return interaction.reply({
      content: 'https://discord.gg/XJCtfTPBfu',
      ephemeral: true,
    });
  },
};
