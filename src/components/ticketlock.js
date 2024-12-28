const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "ticketlock",
  id: "btn-ticketlock",
  permissions: {
    client: [],
    user: ['ManageMessages'],
    dev: false,
  },
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  execute: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return await interaction.reply({ content: `Only the **Ancestor** and **Elders** can lock this ticket`, ephemeral: true })
    // const lockUser = await interaction.member;
    const lunariaID = '839170815932891197'
    const ticketAuthorID = interaction.channel.topic;
    const lunariaFlags = new PermissionsBitField([
      PermissionsBitField.Flags.ViewChannel,
      PermissionsBitField.Flags.SendMessages,
      PermissionsBitField.Flags.ManageMessages,
      PermissionsBitField.Flags.SendTTSMessages,
      PermissionsBitField.Flags.EmbedLinks,
      PermissionsBitField.Flags.AttachFiles,
      PermissionsBitField.Flags.ReadMessageHistory,
      PermissionsBitField.Flags.UseExternalEmojis,
      PermissionsBitField.Flags.AddReactions,
    ]);

    const isLocked = interaction.channel.permissionOverwrites.cache.some(
      (overwrite) => overwrite.id === ticketAuthorID && !overwrite.allow.has(PermissionsBitField.Flags.ViewChannel)
    );

    if (isLocked) {
      // Unlock the ticket
      await interaction.channel.edit({
        permissionOverwrites: [
          {
            id: ticketAuthorID,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
          },
        ],
      });

      await interaction.update({
        ephemeral: true,
        content: `:unlock: Ticket has been **unlocked** for <@${ticketAuthorID}>`,
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("btn-ticketlock")
              .setLabel("Lock")
              .setStyle(ButtonStyle.Primary)
          ),
        ],
      });
    } else {
      await interaction.channel.edit({
        permissionOverwrites: [
          {
            id: lunariaID,
            allow: lunariaFlags,
          },
          {
            id: ticketAuthorID,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
          },
        ],
      });

      await interaction.update({
        ephemeral: true,
        content: `:lock: Ticket has been **locked** from <@${ticketAuthorID}>`,
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("btn-ticketlock")
              .setLabel("Unlock")
              .setStyle(ButtonStyle.Primary)
          ),
        ],
      });
    }
  },
};
