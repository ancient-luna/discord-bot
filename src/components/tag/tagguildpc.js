const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "tagguildpc",
  id: "btn-tagguildpc",
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
      .setTitle("Ⅰ. User Settings")
      .setImage("https://i.imgur.com/Wgo5BJy.png")
      .setColor("#3c3d4f")

    const howTo2 = new EmbedBuilder()
      .setTitle("Ⅱ. Profiles")
      .setImage("https://i.imgur.com/2r3AMGs.png")
      .setColor("#3c3d4f")

    const howTo3 = new EmbedBuilder()
      .setTitle("Ⅲ. Server Tag")
      .setImage("https://i.imgur.com/IvK0tA5.png")
      .setFooter({ text: '*scroll down until you see the server tag option' })
      .setColor("#3c3d4f")
      
    return interaction.reply({
      embeds: [howTo1, howTo2, howTo3],
      flags: MessageFlags.Ephemeral,
    });
  },
};
