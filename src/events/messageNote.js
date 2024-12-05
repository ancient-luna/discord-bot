const { ChannelType, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = new Object({
  name: "messageCreate",
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").Message} message
   */
  async execute(client, message) {
    if (message.author.bot || !message.guild || message.channel.type === ChannelType.DM) return;

    // START OF STICKY MESSAGES =========================================================================================================

    if (client.config.stickyLucentChannel.includes(message.channel.id)) { // StickyNote Lucent Fountain
      const fetchedLucentMessages = await message.channel.messages.fetch();
      const stickyLucentMessage = fetchedLucentMessages.find(m => m.author.id === client.user.id && client.config.stickyLucentChannel.includes(m.channel.id));
      const embedLucent = new EmbedBuilder()
        .setTitle(`The Lucent Fountain <:ancientluna_pure_luna:866781517312688178>`)
        .setDescription(`𝑾𝒆 𝒓𝒂𝒏 𝒂𝒔 𝒊𝒇 𝒕𝒐 𝒎𝒆𝒆𝒕 𝒕𝒉𝒆 𝒎𝒐𝒐𝒏\n**[Be the true light seekers](https://youtu.be/_rJiY6y3a-A)** ✦`)
        .setColor(client.config.embedColorTrans)
        .setThumbnail('https://i.imgur.com/Mza9Zop.png')
      const btnLucent = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("btn-guildterms")
            .setLabel("Read Guild Terms")
            .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("btn-guildvacation")
            .setLabel("Vacation")
            .setEmoji('<:game_logo_bdo:861579805660151818>')
            .setStyle(ButtonStyle.Primary)
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

    if (client.config.stickyGLeagueChannel.includes(message.channel.id)) { // StickyNote Guild Leagues
      const fetchedGLeagueMessages = await message.channel.messages.fetch();
      const stickyGLeagueMessage = fetchedGLeagueMessages.find(m => m.author.id === client.user.id && client.config.stickyGLeagueChannel.includes(m.channel.id));
      // const ringOfire = new AttachmentBuilder("src/assets/ringoffire.mp4");
      const btnGLeague = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel(`More details about the event`)
            .setURL(`https://blackdesert.pearlabyss.com/asia/en-us/News/Notice/Detail?_boardNo=6186`)
        );
      try {
        if (stickyGLeagueMessage) { await stickyGLeagueMessage.delete(); }
        await message.channel.send({
          content: `**Never Break Down!**<:reply:1163568309816541256>\nEvent end <t:1719939600:R> [<t:1719939600:f>]`,
          // files: [ringOfire],
          components: [btnGLeague]
        });
      } catch (error) {
        console.error('Failed to send or delete the sticky message:', error);
      }
    };

    // END OF STICKY MESSAGES =========================================================================================================
  },
});
