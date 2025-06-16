const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
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
        match: (msg) => msg.embeds?.[0]?.title === "The Lucent Fountain",
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
                .setURL('https://discord.gg/tjdhmd38P5')
            )
          ]
        })
      },
      {
        channels: client.config.stickyCTSChannel,
        match: (msg) =>
          msg.components?.[0]?.components?.[0]?.label === "Clan Member Tracking Sheet",
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
        const savedStickyId = await client.db.get(stickyKey);

        // Remove any message that matches the sticky format
        for (const msg of messages.values()) {
          if (
            msg.author.id === client.user.id &&
            sticky.match(msg) &&
            msg.id !== savedStickyId
          ) {
            await msg.delete().catch(() => {});
          }
        }

        // Check if the saved sticky is already the last message
        const lastMsg = messages.first();
        if (lastMsg?.id === savedStickyId) continue;

        // Build sticky
        const content = sticky.build();
        if (!content.content && !content.embeds && !content.files && !content.attachments) {
          content.content = " ";
        }

        const newSticky = await message.channel.send(content);
        await client.db.set(stickyKey, newSticky.id);
      } catch (err) {
        console.error(`[Sticky] Error in #${message.channel.name}:`, err);
      }
    }
  }
});