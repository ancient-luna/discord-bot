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
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return await interaction.reply({ content: `Only the **Ancestor** and **Elders** can close this ticket`, flags: MessageFlags.Ephemeral }).catch((e) => { });
    if (!interaction.channel.name.includes('ticket')) return interaction.reply({
      content: `You are not allowed to delete a non-ticket channel`,
      flags: MessageFlags.Ephemeral
    }).catch((e) => { });

    const channel = interaction.channel;
    const channelName = channel.name;
    const attachment = await discordTranscripts.createTranscript(channel, {
      filename: `${interaction.channel.name}-transcript.html`,
      footerText: `Exported {number} message{s}.`,
      poweredBy: false,
    });
    
    interaction.guild.channels.cache.get('1162419484305391800').send({ content: `Transcripted chat from **# ${channelName}** <:srv_tag:1334880991512236053>`, files: [attachment] })
    interaction.reply({
        content: `Closing ticket in 5 seconds <a:u_load:1334900265953923085>`,
        flags: MessageFlags.Ephemeral
    });

    setTimeout(() => {
      interaction.channel.delete().catch((e) => { });
    }, 5000);
  },
};
