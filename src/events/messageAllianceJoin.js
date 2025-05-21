const { WebhookClient } = require("discord.js");
require('dotenv').config();

const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_ALLIANCE });

module.exports = {
  name: "guildMemberAdd",
  async execute(client, message) {
    if (member.user.bot) return;

    const allianceServerID = client.config.ancientLunaAlliance;
    if (member.guild.id !== allianceServerID) return;

    const displayName = member.displayName || member.user.username;
    const avatarUrl = member.user.displayAvatarURL({ extension: "png", dynamic: true, size: 512 });

    try {
      const sent = await webhookClient.send({
        content: '-# <:ico_join:1374730865430495232> joined the alliance server ⓘ [TacoYaki](<https://discord.gg/tjdhmd38P5>)',
        username: `${displayName}`,
        avatarURL: avatarUrl,
      });
      await client.db.set(`mirror_${message.id}`, sent.id);
    } catch (err) {
      console.error("failed to forward message:", err);
    }
  }
};