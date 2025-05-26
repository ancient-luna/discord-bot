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
        content: `${mentionTxt[Math.floor(Math.random() * mentionTxt.length)]} <@&1235965537326993450> !\n**Please check this guild application** ♡`
    });
  },
};
