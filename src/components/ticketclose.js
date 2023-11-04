const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const { stripIndent } = require("common-tags");
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
  name: "ticketclose",
  id: "btn-ticketclose",
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
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return await interaction.reply({ content: `Only the **Ancestor** and **Elders** can close this ticket`, ephemeral: true })
    if (!interaction.channel.name.includes('ticket')) return interaction.reply({
      content: `You are not allowed to delete a non-ticket channel`,
      ephemeral: true
    }).catch((e) => { });

    const channel = interaction.channel;
    const channelName = channel.name;
    const attachment = await discordTranscripts.createTranscript(channel);

    const download = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel("Download")
        .setStyle(ButtonStyle.Link)
        .setURL(`${attachment}`)
    )

    interaction.guild.channels.cache.get('1162419484305391800').send({ content: `Transcripted chat from **# ${channelName}** <:tag:1170150772894351541>`, components: [download] })
    interaction.reply({
        content: `Closing ticket in 5 seconds <a:_util_loading:863317596551118858>`,
        ephemeral: true
    });

    setTimeout(() => {
      interaction.channel.delete().catch((e) => { });
    }, 5000);
  },
};
