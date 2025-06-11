const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");
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
    const dayMatch = originalMessage.embeds[0]?.description?.match(/Requested Day Off: (\d+) Days/);
    const userID = userIdMatch ? userIdMatch[1] : "`undefined`";
    const dayOff = dayMatch ? dayMatch[1] : "`undefined`";

    interaction.guild.channels.cache.get('1060992670035619931').send({ content: `**Good news to <@${userID}> !** <:bdo_bs_sprout:1343145256555905165>\n-# Your ${dayOff} days off for vacation have been approved by <@${interaction.user.id}>` });
        
    const updatedButton = new ButtonBuilder()
      .setCustomId('btn-guildvacationacc')
      .setLabel(`Approved by ${interaction.member.displayName}`)
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true);

    const row = new ActionRowBuilder().addComponents(updatedButton);

    await interaction.update({
      content: '⁣',
      components: [row],
    });

    return interaction.followUp({
      content: `Successfully approved <:srv_accepted:1334885365676507188>`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
