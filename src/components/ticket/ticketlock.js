const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, MessageFlags, ContainerBuilder, TextDisplayBuilder } = require("discord.js");

module.exports = {
  name: "ticketlock",
  id: "btn-ticketlock",
  permissions: {
    client: [],
    user: ['ManageMessages'],
    dev: false,
  },

  execute: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return await interaction.reply({ content: `Only the **Ancestor** and **Lunarians** can lock this ticket`, flags: MessageFlags.Ephemeral })

    const lunariaID = client.config.lunariaRole;
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

    const container = new ContainerBuilder()
    const existingText = interaction.message.components[0]?.components[0]?.content || interaction.message.components[0]?.components[0]?.data?.content || "Ticket Controls";
    const text = new TextDisplayBuilder().setContent(existingText)

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

      const buttons = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("btn-ticketclose")
            .setLabel("Save and Close")
            .setStyle(ButtonStyle.Danger),
          new ButtonBuilder()
            .setCustomId("btn-ticketlock")
            .setLabel("Lock")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId("btn-ticketmention")
            .setLabel("Mention Now")
            .setStyle(ButtonStyle.Secondary)
        )

      container.addTextDisplayComponents(text)
      container.addActionRowComponents(buttons)

      await interaction.update({
        flags: MessageFlags.IsComponentsV2,
        components: [container],
      });

      await interaction.followUp({
        content: `:unlock: Ticket has been **unlocked** for <@${ticketAuthorID}>`,
        flags: MessageFlags.Ephemeral,
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

      const buttons = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("btn-ticketclose")
            .setLabel("Save and Close")
            .setStyle(ButtonStyle.Danger),
          new ButtonBuilder()
            .setCustomId("btn-ticketlock")
            .setLabel("Unlock")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId("btn-ticketmention")
            .setLabel("Mention Now")
            .setStyle(ButtonStyle.Secondary)
        )

      container.addTextDisplayComponents(text)
      container.addActionRowComponents(buttons)

      await interaction.update({
        flags: MessageFlags.IsComponentsV2,
        components: [container],
      });

      await interaction.followUp({
        content: `:lock: Ticket has been **locked** from <@${ticketAuthorID}>`,
        flags: MessageFlags.Ephemeral,
      })
    }
  },
};