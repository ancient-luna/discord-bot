const { PermissionsBitField, MessageFlags, ContainerBuilder, TextDisplayBuilder, FileBuilder, AttachmentBuilder } = require("discord.js");
const discordTranscripts = require('discord-html-transcripts');
const puppeteer = require('puppeteer');

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

    const htmlTranscript = await discordTranscripts.createTranscript(channel, {
      footerText: `Exported {number} message{s}.`,
      poweredBy: false,
      returnType: 'string'
    });

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(htmlTranscript, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
    });
    await browser.close();

    const attachment = new AttachmentBuilder(pdfBuffer, { name: `${interaction.channel.name}-transcript.pdf` });

    const container = new ContainerBuilder()
    const text = new TextDisplayBuilder().setContent(`-# <:srv_attachment:1334881013943504980> Transcripted chat from **#${channelName}**`)
    const file = new FileBuilder().setURL(`attachment://${interaction.channel.name}-transcript.pdf`)

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
