const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "guildvacationacc",
  id: "btn-guildvacationacc",
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

    const originalMessage = await interaction.message.fetch(); 
    const displayNameMatch = originalMessage.embeds[0]?.description?.match(/\*\*\*(.*?)\*\*\*/);
    const displayName = displayNameMatch ? displayNameMatch[1] : "???";

    interaction.guild.channels.cache.get('1076767724224659526').send({ content: `Good news to **${displayName}**! Your vacation has been approved by <@${interaction.user.id}>` })
        
    return interaction.reply({
      content: `*successfully approved*`,
      ephemeral: true
    })
  },
};
