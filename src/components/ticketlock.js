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
    
    const lunariaID = '839170815932891197'
    const ticketAuthorID = interaction.channel.topic;

    const ticketAuthorFlags = new PermissionsBitField([
      PermissionsBitField.Flags.ViewChannel,
      PermissionsBitField.Flags.SendMessages,
      PermissionsBitField.Flags.SendTTSMessages,
      PermissionsBitField.Flags.EmbedLinks,
      PermissionsBitField.Flags.AttachFiles,
      PermissionsBitField.Flags.ReadMessageHistory,
      PermissionsBitField.Flags.UseExternalEmojis,
      PermissionsBitField.Flags.AddReactions,
    ]);

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
      await interaction.channel.edit({
        permissionOverwrites: [
          {
            id: lunariaID,
            allow: lunariaFlags,
          },
          {
            id: ticketAuthorID,
            allow: ticketAuthorFlags,
          },
          {
            id: interaction.guild.roles.everyone,
            deny: PermissionsBitField.Flags.ViewChannel,
          },
        ],
      });

      await interaction.update({
        components: [
          new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId("btn-ticketclose")
                .setLabel("Save and Close")
                .setStyle(ButtonStyle.Danger)
            )
            .addComponents(
              new ButtonBuilder()
                .setCustomId("btn-ticketlock")
                .setLabel("Lock")
                .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
              new ButtonBuilder()
                .setCustomId("btn-ticketmention")
                .setLabel("Mention Now")
                .setStyle(ButtonStyle.Secondary)
            ),
        ],
      });

      await interaction.reply({
        content: `:unlock: Ticket has been **unlocked** for <@${ticketAuthorID}>`,
        ephemeral: true,
      })

    } else {
      await interaction.channel.edit({
        permissionOverwrites: [
          {
            id: lunariaID,
            allow: lunariaFlags,
          },
          {
            id: ticketAuthorID,
            deny: ticketAuthorFlags,
          },
          {
            id: interaction.guild.roles.everyone,
            deny: PermissionsBitField.Flags.ViewChannel,
          },
        ],
      });

      await interaction.update({
        components: [
          new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId("btn-ticketclose")
                .setLabel("Save and Close")
                .setStyle(ButtonStyle.Danger)
            )
            .addComponents(
              new ButtonBuilder()
                .setCustomId("btn-ticketlock")
                .setLabel("Unlock")
                .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
              new ButtonBuilder()
                .setCustomId("btn-ticketmention")
                .setLabel("Mention Now")
                .setStyle(ButtonStyle.Secondary)
            ),
        ],
      });

      await interaction.reply({
        content: `:lock: Ticket has been **locked** from <@${ticketAuthorID}>`,
        ephemeral: true,
      })
    }
  },
};