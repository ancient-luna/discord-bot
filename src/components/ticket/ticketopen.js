const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType, MessageFlags, ContainerBuilder, TextDisplayBuilder } = require("discord.js");

module.exports = {
  name: "ticketopen",
  id: "btn-ticketopen",
  permissions: {
    client: [],
    user: [],
    dev: false,
  },

  execute: async (client, interaction) => {
    const ticketCategory = client.config.ticketCategory;
    const lunariaID = client.config.lunariaRole;
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
    ])

    const openTicket = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      parent: ticketCategory,
      topic: interaction.user.id,
      permissionOverwrites: [
        {
          id: lunariaID,
          allow: lunariaFlags,
        },
        {
          id: interaction.user.id,
          allow: PermissionsBitField.Flags.ViewChannel,
        },
        {
          id: interaction.guild.roles.everyone,
          deny: PermissionsBitField.Flags.ViewChannel,
        },
      ],
    });

    const container = new ContainerBuilder()
    const text = new TextDisplayBuilder().setContent(`# ${interaction.user.displayName}'s 𝖙𝖎𝖈𝖐𝖊𝖙 \nPlease write down your appeal and take your time while you wait <:ico_write:1334864388942856212>\n-# The Ancestor and the Lunarians will arrive as soon as possible, if they still live beyond the veil.`)
    const buttons = new ActionRowBuilder().addComponents(
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

    await openTicket.send({ flags: MessageFlags.IsComponentsV2, components: [container] })

    await interaction.reply({
      content: `Your ticket opened in ${openTicket}`,
      flags: MessageFlags.Ephemeral
    });
  },
};
