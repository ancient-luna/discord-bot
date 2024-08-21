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
    const userIdMatch = originalMessage.embeds[0]?.description?.match(/\*\*\*\<\@(\d+)\>\*\*\*/);
    const userID = userIdMatch ? userIdMatch[1] : "`???`";

    interaction.guild.channels.cache.get('1060992670035619931').send({ content: `**Good news** to <@${userID}> ! Your vacation has been **approved** by <@${interaction.user.id}> <:vcon_vote_accepted:859075138329903114>` });
        
    const updatedButton = new ButtonBuilder()
      .setCustomId('btn-guildvacationacc')
      .setLabel('Approved')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true);

    const row = new ActionRowBuilder().addComponents(updatedButton);

    await interaction.update({
      content: '⁣',
      components: [row],
    });

    return interaction.followUp({
      content: `*Successfully approved* <:vcon_vote_accepted:859075138329903114>`,
      ephemeral: true
    });
  },
};
