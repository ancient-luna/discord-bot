const { ChannelType, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = new Object({
  name: "messageCreate",
  
  async execute(client, message) {
    if (message.author.bot || !message.guild || message.channel.type === ChannelType.DM) return;

    if (client.config.stickyLucentChannel.includes(message.channel.id)) { // StickyNote Lucent Fountain
      const fetchedLucentMessages = await message.channel.messages.fetch();
      const stickyLucentMessage = fetchedLucentMessages.find(m => m.author.id === client.user.id && client.config.stickyLucentChannel.includes(m.channel.id));
      const embedLucent = new EmbedBuilder()
        .setTitle(`The Lucent Fountain`)
        .setDescription(`𝑾𝒆 𝒓𝒂𝒏 𝒂𝒔 𝒊𝒇 𝒕𝒐 𝒎𝒆𝒆𝒕 𝒕𝒉𝒆 𝒎𝒐𝒐𝒏\n**[Be the true light seekers](https://youtu.be/_rJiY6y3a-A)** ✦`)
        .setColor(client.config.embedColorTrans)
        .setThumbnail('https://i.imgur.com/Mza9Zop.png')
      const btnLucent = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("btn-guildvacation")
            .setLabel("Vacation")
            // .setEmoji('<:bdo:1334891168407752806>')
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
      try {
        if (stickyLucentMessage) { await stickyLucentMessage.delete(); }
        await message.channel.send({ embeds: [embedLucent], components: [btnLucent] });
      } catch (error) {
        console.error('Failed to send or delete the sticky message:', error);
      }
    };

    if (client.config.stickyTalesChannel.includes(message.channel.id)) { // StickyNote Tales of Lights
      const fetchedTalesMessages = await message.channel.messages.fetch();
      const stickyTalesMessage = fetchedTalesMessages.find(m => m.author.id === client.user.id && client.config.stickyTalesChannel.includes(m.channel.id));
      const lunaThumbnails = [
        'https://i.imgur.com/B6u2feA.png', 'https://i.imgur.com/DrmVtuP.png', 'https://i.imgur.com/Z5mq7OF.png',
        'https://i.imgur.com/M0U4I56.png', 'https://i.imgur.com/jOGuk7s.png', 'https://i.imgur.com/tM9xIaq.png',
        'https://i.imgur.com/hIBEDkM.png', 'https://i.imgur.com/GUYxDJF.png', 'https://i.imgur.com/MjADPRv.png',
        'https://i.imgur.com/InURa9o.png', 'https://i.imgur.com/son6e07.png', 'https://i.imgur.com/0wE5Qyp.png',
        'https://i.imgur.com/DHzUulL.png', 'https://i.imgur.com/bEIn9Ag.png', 'https://i.imgur.com/qkw8aXV.png'
      ];
      const randomThumbnail = lunaThumbnails[Math.floor(Math.random() * lunaThumbnails.length)];
      const embedSheet = new EmbedBuilder()
        .setTitle('Ancient Luna Activity Tracker')
        .setDescription('Thanks for the hard work!\nClick on this button to update the payout sheet.')
        .setThumbnail(randomThumbnail)
        .setColor(client.config.embedColorTrans);
      const btnSheet = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel('Payout sheet')
          .setURL('https://docs.google.com/spreadsheets/d/1hb-WK8921d0erv4zQ5vTpBzEsnMNW0VTLycHwyAW3_k')
      );
      try {
        if (stickyTalesMessage) { await stickyTalesMessage.delete(); }
        await message.channel.send({ embeds: [embedSheet], components: [btnSheet] });
      } catch (error) {
        console.error('Failed to send or delete the sticky message:', error);
      }
    };

    if (client.config.stickyCTSChannel.includes(message.channel.id)) { // StickyNote CTS/CTL
      const fetchedCTSMessages = await message.channel.messages.fetch();
      const stickyCTSMessage = fetchedCTSMessages.find(m => m.author.id === client.user.id && client.config.stickyCTSChannel.includes(m.channel.id));
      const btnCTS = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel(`Clan Member Tracking Sheet`)
            .setURL(`https://docs.google.com/spreadsheets/d/16mQsX0bVe2iLHwJmpHIQhZb-iBqGC1FO/edit?rtpof=true&sd=true`)
        );
      try {
        if (stickyCTSMessage) { await stickyCTSMessage.delete(); }
        await message.channel.send({
          // content: `-# CTS/CTL Requirement • https://discord.com/channels/447069790150852609/881836063398723585/1323180190679175219`,
          components: [btnCTS]
        });
      } catch (error) {
        console.error('Failed to send or delete the sticky message:', error);
      }
    };
  },
});