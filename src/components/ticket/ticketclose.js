const { PermissionsBitField, MessageFlags, ContainerBuilder, TextDisplayBuilder, FileBuilder } = require("discord.js");
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
  name: "ticketclose",
  id: "btn-ticketclose",
  permissions: {
    client: [],
    user: ['ManageMessages'],
    dev: false,
  },

  execute: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return await interaction.reply({ content: `Only the **Ancestor** and **Lunarians** can close this ticket`, flags: MessageFlags.Ephemeral }).catch((e) => { });
    if (!interaction.channel?.name?.includes('ticket')) return interaction.reply({
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
    const container = new ContainerBuilder()
    const text = new TextDisplayBuilder().setContent(`-# <:srv_attachment:1334881013943504980> Transcripted chat from **#${channelName}**`)
    const file = new FileBuilder().setURL(`attachment://${interaction.channel.name}-transcript.html`)

    container.addTextDisplayComponents(text)
    container.addFileComponents(file)

    interaction.guild.channels.cache.get(client.config.ticketChannel).send({ flags: MessageFlags.IsComponentsV2, components: [container], files: [attachment] })
    interaction.reply({
      content: `Closing ticket in 5 seconds <a:u_load:1334900265953923085>`,
      flags: MessageFlags.Ephemeral
    });

    setTimeout(() => {
      interaction.channel.delete().catch((e) => { });
    }, 5000);
  },
};
