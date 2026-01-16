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

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    try {
      const htmlTranscript = await discordTranscripts.createTranscript(channel, {
        footerText: `Exported {number} message{s}.`,
        poweredBy: false,
        returnType: 'string'
      });

      const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage'
        ]
      });
      const page = await browser.newPage();

      await page.setViewport({ width: 1280, height: 800 });
      await page.setContent(htmlTranscript, { waitUntil: 'networkidle0' });

      const screenshot = await page.screenshot({ fullPage: true });

      const dimensions = await page.evaluate(() => {
        return {
          width: document.documentElement.scrollWidth,
          height: document.documentElement.scrollHeight
        };
      });

      const screenshotBase64 = screenshot.toString('base64');
      await page.setContent(`
        <body style="margin: 0; padding: 0;">
            <img src="data:image/png;base64,${screenshotBase64}" style="width: 100%; display: block;">
        </body>
    `);

      const pdfResult = await page.pdf({
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        printBackground: true,
        pageRanges: '1'
      });

      await browser.close();

      const pdfBuffer = Buffer.from(pdfResult);
      const attachment = new AttachmentBuilder(pdfBuffer, { name: `${interaction.channel.name}-transcript.pdf` });

      const container = new ContainerBuilder()
      const text = new TextDisplayBuilder().setContent(`-# <:srv_attachment:1334881013943504980> **#${channelName}** (c) ${interaction.user.displayName}`)
      const file = new FileBuilder().setURL(`attachment://${interaction.channel.name}-transcript.pdf`)

      container.addTextDisplayComponents(text)
      container.addFileComponents(file)

      await interaction.guild.channels.cache.get(client.config.ticketChannel).send({ flags: MessageFlags.IsComponentsV2, components: [container], files: [attachment] })

      await interaction.editReply({
        content: `Closing ticket in 5 seconds <a:u_load:1334900265953923085>`,
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply({ content: `Something went wrong while generating the transcript` });
    }

    setTimeout(() => {
      interaction.channel.delete().catch((e) => { });
    }, 5000);
  },
};
