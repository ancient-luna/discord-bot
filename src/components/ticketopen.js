const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "ticketopen",
  id: "btn-ticketopen",
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
    const ticketCategory = '1010531564586811453'
    const lunariaID = '839170815932891197'
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
      permissionOverwrites: [
        {
          id: lunariaID,
          allow: lunariaFlags,
        },
        {
          id: interaction.user.id,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: interaction.guild.roles.everyone,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    });

    const mEmbed = new EmbedBuilder()
        .setAuthor({ name: `✦ ${interaction.user.username}'s ticket ✦`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`**Thank you for your application.**\nThe Ancestor and the Elders will be here as soon as possible! If they are still alive out there. Please take your time while waiting`)
        .setFooter({ text: `note: Don't hesitate to mention them if need now ` })
        .setColor(client.config.embedColorTrans)

    const btnTicket = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId("btn-ticketclose")
        .setLabel("Delete")
        .setStyle(ButtonStyle.Danger)
    )
    .addComponents(
        new ButtonBuilder()
        .setCustomId("btn-ticketlock")
        .setLabel("Close")
        .setStyle(ButtonStyle.Danger)
    )
    .addComponents(
        new ButtonBuilder()
        .setCustomId("btn-ticketscript")
        .setLabel("Save")
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
        new ButtonBuilder()
        .setCustomId("btn-ticketmention")
        .setLabel("Mention Now")
        .setStyle(ButtonStyle.Secondary)
    );
    
    await openTicket.send({ embeds: [mEmbed], components: [btnTicket] })

    await interaction.reply({
      content: `Your ticket opened in ${openTicket}`,
      ephemeral: true
  });
  },
};
