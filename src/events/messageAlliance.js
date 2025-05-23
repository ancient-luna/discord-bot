const { WebhookClient, StickerFormatType } = require("discord.js");
require('dotenv').config();

const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_ALLIANCE });

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return;

    const allianceServerID = client.config.ancientLunaAlliance;
    if (message.guild?.id !== allianceServerID) return;

    const channelName = message.channel.name;

    const member = await message.guild.members.fetch(message.author.id).catch(() => {});
    const displayName = member?.displayName || message.author.username;
    const avatarUrl = message.author.displayAvatarURL({ extension: "png", dynamic: true, size: 512 });

    let body = message.content?.trim() || "";

    const emojiNameRegex = /:([a-zA-Z0-9_]+):/g;
    body = body.replace(emojiNameRegex, (match, name) => {
      const emoji = client.emojis.cache.find(e => e.name === name);
      if (!emoji) return match;
      return `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>`;
    });
    
    const sticker = message.stickers.first();
    let stickerUrl = null;
    if (sticker) {
      const isAnimated = sticker.format === StickerFormatType.Lottie || sticker.format === StickerFormatType.APNG;
      if (!isAnimated) {
        stickerUrl = `https://media.discordapp.net/stickers/${sticker.id}.png?size=320&passthrough=false`;
      }
    }
    if (!body && stickerUrl) { body = stickerUrl; }

    // if (message.stickers.size) body = message.stickers.first().url;

    if (!body && message.attachments.size === 0) return;

    try {
      const sent = await webhookClient.send({
        content: body,
        username: `${displayName} ・ #${channelName}`,
        avatarURL: avatarUrl,
        files: message.attachments.map(att => att.url),
        allowedMentions: { parse: [] },
      });
      await client.db.set(`mirror_${message.id}`, sent.id);
    } catch (err) {
      console.error("failed to forward message:", err);
    }
  }
};