const { WebhookClient } = require("discord.js");
require('dotenv').config();

const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_ALLIANCE });

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    const allianceServerID = client.config.ancientLunaAlliance;
    if (message.guild?.id !== allianceServerID) return;
    if ((message.flags?.bitfield ?? 0) & 64) return;

    // force refetch if the message is from a bot
    if (message.author.bot) {
      try {
        message = await message.channel.messages.fetch(message.id);
      } catch (e) {
        console.warn("Could not refetch full message:", e);
        return;
      }
    }

    const channelName = message.channel.name;
    const member = await message.guild.members.fetch(message.author.id).catch(() => {});
    const displayName = member?.displayName || message.author.username;
    const avatarUrl = message.author.displayAvatarURL({ extension: "png", dynamic: true, size: 512 });
    let body = message.content?.trim() || "";

    const emojiRegex = /<a?:\w+:(\d+)>/g;
    const emojiMatches = [...body.matchAll(emojiRegex)];
    if (emojiMatches.length) {
      const parts = body.split(emojiRegex);
      if (parts.join("").trim() === "") {
        if (emojiMatches.length === 1) {
          const isAnimated = emojiMatches[0][0].startsWith("<a:");
          const ext = isAnimated ? "gif" : "png";
          body = `https://cdn.discordapp.com/emojis/${emojiMatches[0][1]}.${ext}?size=48`;
        } else {
          body = emojiMatches.map(m => {
            const isAnimated = m[0].startsWith("<a:");
            const ext = isAnimated ? "gif" : "png";
            return `[☺](https://cdn.discordapp.com/emojis/${m[1]}.${ext}?size=48)`;
          }).join(" ");
        }
      } else {
        body = body.replace(emojiRegex, (match, id) => {
          const isAnimated = match.startsWith("<a:");
          const ext = isAnimated ? "gif" : "png";
          return `[☺](https://cdn.discordapp.com/emojis/${id}.${ext}?size=48)`;
        });
      }
    }

    if (message.stickers.size) {
      const sticker = message.stickers.first();
      if ( sticker.format === 3 ) {
        body = `-# is sending sticker ✨ ***${sticker.name}***`
      } else {
        body = `https://media.discordapp.net/stickers/${sticker.id}.png?size=160&passthrough=false`;
      }
    }

    const embedData = message.embeds?.map(embed => embed.toJSON()) || [];
    const componentData = message.components?.map(row => ({ type: row.type, components: row.components.map(button => button.toJSON()) })) || [];

    if (!body && message.attachments.size === 0 && embedData.length === 0 && componentData.length === 0) return;

    try {
      const sent = await webhookClient.send({
        content: body,
        username: `${displayName} ・ ${channelName}`,
        avatarURL: avatarUrl,
        files: message.attachments.map(att => att),
        embeds: embedData,
        components: componentData,
        allowedMentions: { parse: [] },
      });
      await client.db.set(`mirror_${message.id}`, sent.id);
    } catch (err) {
      console.error("failed to forward message:", err);
    }
  }
};