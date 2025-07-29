const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require("discord.js");

// Store sticky message IDs, last update times, and processing locks
const stickyMessageIds = new Map(); // channelId -> messageId
const lastUpdate = new Map(); // channelId -> timestamp
const processingLocks = new Map(); // channelId -> Promise
const STICKY_COOLDOWN = 3000; // 3 seconds

/**
 * Updates sticky message for a channel with race condition protection
 * @param {import("discord.js").TextChannel} channel
 * @param {Object} embed
 * @param {Object} components
 * @param {string} content
 */
async function updateStickyMessage(channel, embed, components, content = null) {
  // If already processing for this channel, wait for it to complete
  if (processingLocks.has(channel.id)) {
    await processingLocks.get(channel.id);
    return; // Skip this update since another one just completed
  }

  // Create a lock for this channel
  const updatePromise = (async () => {
    try {
      // Store old message ID before deletion
      const oldMessageId = stickyMessageIds.get(channel.id);

      // Send new sticky message first
      const messageOptions = { components };
      if (embed) messageOptions.embeds = [embed];
      if (content) messageOptions.content = content;

      const newSticky = await channel.send(messageOptions);
      stickyMessageIds.set(channel.id, newSticky.id);
      lastUpdate.set(channel.id, Date.now());

      // Delete old sticky message after new one is sent
      if (oldMessageId && oldMessageId !== newSticky.id) {
        try {
          const oldMessage = await channel.messages.fetch(oldMessageId);
          await oldMessage.delete();
        } catch (error) {
          // Message might already be deleted, ignore
        }
      }
    } catch (error) {
      console.error("Failed to update sticky message:", error);
    }
  })();

  processingLocks.set(channel.id, updatePromise);

  try {
    await updatePromise;
  } finally {
    processingLocks.delete(channel.id);
  }
}

module.exports = new Object({
  name: "messageCreate",
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").Message} message
   */
  async execute(client, message) {
    if ( message.author.bot || !message.guild || message.channel.type === ChannelType.DM ) return;

    // Check cooldown to prevent spam
    const now = Date.now();
    if (now - (lastUpdate.get(message.channel.id) || 0) < STICKY_COOLDOWN) { return; }

    // StickyNote Lucent Fountain
    if (client.config.stickyLucentChannel.includes(message.channel.id)) {
      const embedLucent = new EmbedBuilder()
        .setTitle(`The Lucent Fountain`)
        .setDescription(`𝑾𝒆 𝒓𝒂𝒏 𝒂𝒔 𝒊𝒇 𝒕𝒐 𝒎𝒆𝒆𝒕 𝒕𝒉𝒆 𝒎𝒐𝒐𝒏\n**[Be the true light seekers](https://youtu.be/_rJiY6y3a-A)** ✦`)
        .setColor(client.config.embedColorTrans)
        .setThumbnail("https://i.imgur.com/Mza9Zop.png");
      const btnLucent = new ActionRowBuilder().addComponents(
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
          .setURL("https://discord.gg/tjdhmd38P5")
      );
      await updateStickyMessage(message.channel, embedLucent, [btnLucent]);
    }

    // StickyNote CTS/CTL
    if (client.config.stickyCTSChannel.includes(message.channel.id)) {
      const btnCTS = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel(`Clan Member Tracking Sheet`)
          .setURL(`https://docs.google.com/spreadsheets/d/16mQsX0bVe2iLHwJmpHIQhZb-iBqGC1FO/edit?rtpof=true&sd=true`)
      );
      await updateStickyMessage(message.channel, null, [btnCTS]);
    }

    // StickyNote Tales of Lights
    // if (client.config.stickyTalesChannel.includes(message.channel.id)) {
    //   const lunaThumbnails = [
    //     "https://i.imgur.com/B6u2feA.png",
    //     "https://i.imgur.com/DrmVtuP.png",
    //     "https://i.imgur.com/Z5mq7OF.png",
    //     "https://i.imgur.com/M0U4I56.png",
    //     "https://i.imgur.com/jOGuk7s.png",
    //     "https://i.imgur.com/tM9xIaq.png",
    //     "https://i.imgur.com/hIBEDkM.png",
    //     "https://i.imgur.com/GUYxDJF.png",
    //     "https://i.imgur.com/MjADPRv.png",
    //     "https://i.imgur.com/InURa9o.png",
    //     "https://i.imgur.com/son6e07.png",
    //     "https://i.imgur.com/0wE5Qyp.png",
    //     "https://i.imgur.com/DHzUulL.png",
    //     "https://i.imgur.com/bEIn9Ag.png",
    //     "https://i.imgur.com/qkw8aXV.png",
    //   ];
    //   const randomThumbnail =
    //     lunaThumbnails[Math.floor(Math.random() * lunaThumbnails.length)];
    //   const embedSheet = new EmbedBuilder()
    //     .setTitle("Ancient Luna Activity Tracker")
    //     .setDescription(
    //       "Thanks for the hard work!\nClick on this button to update the payout sheet."
    //     )
    //     .setThumbnail(randomThumbnail)
    //     .setColor(client.config.embedColorTrans);
    //   const btnSheet = new ActionRowBuilder().addComponents(
    //     new ButtonBuilder()
    //       .setStyle(ButtonStyle.Link)
    //       .setLabel("Payout sheet")
    //       .setURL(
    //         "https://docs.google.com/spreadsheets/d/1hb-WK8921d0erv4zQ5vTpBzEsnMNW0VTLycHwyAW3_k"
    //       )
    //   );
    //   await updateStickyMessage(message.channel, embedSheet, [btnSheet]);
    // }
  },
});
