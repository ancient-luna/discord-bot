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

    await interaction.channel.edit({
		permissionOverwrites: [
		{
			id: lockUser,
			allow: ['ViewChannel'],
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
