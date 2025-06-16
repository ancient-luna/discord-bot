const { ChannelType, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const stickyCooldown = new Map();

module.exports = new Object({
  name: "messageCreate",
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").Message} message
   */
  async execute(client, message) {
    if (!message.guild || message.channel.type === ChannelType.DM) return;

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
      const cooldownKey = `cd_${message.channel.id}`;

      if (stickyCooldown.has(cooldownKey)) return;
      stickyCooldown.set(cooldownKey, true);
      setTimeout(() => stickyCooldown.delete(cooldownKey), 2000);

      try {
        const messages = await message.channel.messages.fetch({ limit: 10 });
        const lastMsg = messages.first();

        const stickyMsgId = await client.db.get(stickyKey);
        let stickyMsg = null;

        if (stickyMsgId) {
          stickyMsg = messages.find(msg => msg.id === stickyMsgId) || await message.channel.messages.fetch(stickyMsgId).catch(() => null);

          if (stickyMsg) {
            await stickyMsg.delete().catch(() => {});
            await client.db.delete(stickyKey);
          }
        }

        // after deleting, if latest message is still same sticky, skip
        if (lastMsg && lastMsg.id === stickyMsgId) continue;

        const content = sticky.build();
        if (!content.content && !content.embeds && !content.files && !content.attachments) {
          content.content = " ";
        }

        const newSticky = await message.channel.send(content);
        await client.db.set(stickyKey, newSticky.id);

      } catch (err) {
        console.error(`[Sticky Error] in #${message.channel.name}:`, err);
      }
    }
  }
});