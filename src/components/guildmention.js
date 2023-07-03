const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "guildmention",
  id: "btn-guildmention",
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
    const mentionTxt = [
        'Please be alive dear',
        'Wake up',
        'Hey, I think this seeker need your existences',
        'Psst.. pssst..'
    ]
    return interaction.reply({
        content: `${mentionTxt[Math.floor(Math.random() * mentionTxt.length)]} <@&1076513302970109985> <@&1076513338361643068> <@&1076513211391688735> <@&1076513403364966440> <@&1076513372461334530> !\n**Please check this guild application** :white_heart:`
    });
  },
};
