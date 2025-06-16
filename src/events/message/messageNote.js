const { ChannelType, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = new Object({
  name: "messageCreate",
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").Message} message
   */
  async execute(client, message) {if (!message.guild || message.channel.type === ChannelType.DM) return;

    const stickyConfigs = [
      {
        channels: client.config.stickyLucentChannel,
        build: () => ({
          embeds: [
            new EmbedBuilder()
              .setTitle(`The Lucent Fountain`)
              .setDescription(`𝑾𝒆 𝒓𝒂𝒏 𝒂𝒔 𝒊𝒇 𝒕𝒐 𝒎𝒆𝒆𝒕 𝒕𝒉𝒆 𝒎𝒐𝒐𝒏\n**[Be the true light seekers](https://youtu.be/_rJiY6y3a-A)** ✦`)
              .setColor(client.config.embedColorTrans)
              .setThumbnail('https://i.imgur.com/Mza9Zop.png')
          ],
          components: [
            new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("btn-guildvacation")
                .setLabel("Vacation")
                .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
                .setCustomId("btn-guildterms")
                .setLabel("Rules")
                .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
                .setLabel("Join Alliance")
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/tjdhmd38P5'),
            )
          ]
        })
      },
      {
        channels: client.config.stickyTalesChannel,
        build: () => {
          const thumbnails = [
            'https://i.imgur.com/B6u2feA.png', 'https://i.imgur.com/DrmVtuP.png', 'https://i.imgur.com/Z5mq7OF.png',
            'https://i.imgur.com/M0U4I56.png', 'https://i.imgur.com/jOGuk7s.png', 'https://i.imgur.com/tM9xIaq.png',
            'https://i.imgur.com/hIBEDkM.png', 'https://i.imgur.com/GUYxDJF.png', 'https://i.imgur.com/MjADPRv.png',
            'https://i.imgur.com/InURa9o.png', 'https://i.imgur.com/son6e07.png', 'https://i.imgur.com/0wE5Qyp.png',
            'https://i.imgur.com/DHzUulL.png', 'https://i.imgur.com/bEIn9Ag.png', 'https://i.imgur.com/qkw8aXV.png'
          ];
          const thumb = thumbnails[Math.floor(Math.random() * thumbnails.length)];

          return {
            embeds: [
              new EmbedBuilder()
                .setTitle('Ancient Luna Activity Tracker')
                .setDescription('Thanks for the hard work!\nClick on this button to update the payout sheet.')
                .setThumbnail(thumb)
                .setColor(client.config.embedColorTrans)
            ],
            components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Link)
                  .setLabel('Payout sheet')
                  .setURL('https://docs.google.com/spreadsheets/d/1hb-WK8921d0erv4zQ5vTpBzEsnMNW0VTLycHwyAW3_k')
              )
            ]
          }
        }
      },
      {
        channels: client.config.stickyCTSChannel,
        build: () => ({
          components: [
            new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel(`Clan Member Tracking Sheet`)
                .setURL(`https://docs.google.com/spreadsheets/d/16mQsX0bVe2iLHwJmpHIQhZb-iBqGC1FO/edit?rtpof=true&sd=true`)
            )
          ]
        })
      }
    ];

    for (const sticky of stickyConfigs) {
      if (!sticky.channels.includes(message.channel.id)) continue;

      const stickyKey = `sticky_${message.channel.id}`;

      try {
        const messages = await message.channel.messages.fetch({ limit: 10 });
        const lastMsg = messages.first();
        if (!lastMsg) continue;

        const stickyMsgId = await client.db.get(stickyKey);
        const stickyMsg = stickyMsgId
          ? await message.channel.messages.fetch(stickyMsgId).catch(() => null)
          : null;

        // If sticky is already last message, skip
        if (stickyMsg && stickyMsg.id === lastMsg.id) continue;

        // Delete old sticky if exists
        if (stickyMsg) await stickyMsg.delete().catch(() => {});

        // Build new sticky content
        const content = sticky.build();

        // Ensure content isn't "empty" (Discord will reject)
        if (!content.content && !content.embeds && !content.files && !content.attachments) {
          content.content = " ";
        }

        // Send and save
        const newSticky = await message.channel.send(content);
        await client.db.set(stickyKey, newSticky.id);

      } catch (err) {
        console.error(`[Sticky] Error in #${message.channel.name}:`, err);
      }
    }
  }
});