const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "ticketmention",
  id: "btn-ticketmention",
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
        'Hey, I think this seeker need your help',
        'Psst.. pssst..'
    ]
    return interaction.reply({
        content: `${mentionTxt[Math.floor(Math.random() * mentionTxt.length)]} <@&590848319111299093> <@&839170815932891197> !\n**Please check this ticket** ♡`
    });
  },
};
