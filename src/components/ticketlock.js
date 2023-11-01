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
    const lockUser = await interaction.member;
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

    await interaction.channel.edit({
		permissionOverwrites: [
		{
			id: [lockUser, lunariaID],
			allow: lunariaFlags,
		  },
		  {
			id: interaction.guild.roles.everyone,
			deny: ['ViewChannel', 'SendMessages'],
		  },
		],
    });

	await interaction.reply({ content: ':file_folder: ticket has been **archived**\n*this channel is hidden from the author of this ticket*', ephemeral: true });
  },
};
