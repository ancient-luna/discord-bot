const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (client, message, args) => {
    const channel = await message.guild.channels.create(`sorting-${message.author.username}`).catch((err) => message.channel.send("I do not have permission to create a channel!").catch((e) => {}))

    channel.setParent("1072782886211698758");

    const seekerID = await message.guild.roles.cache.get("1000932479043125312");

    channel.permissionOverwrites.create(seekerID, {
        ADMINISTRATOR: true
    });

    channel.permissionOverwrites.create(message.guild.id, {
        VIEW_CHANNEL: false
    });

    channel.permissionOverwrites.create(message.author, {
        SEND_MESSAGES: true,
        SEND_TTS_MESSAGES: true,
        VIEW_CHANNEL: true,
        EMBED_LINKS: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
        USE_EXTERNAL_EMOJIS: true,
        ADD_REACTIONS: false
    });
    
    const sortingHat = new MessageEmbed()
        .setDescription(`*Hmm. Difficult. Very difficult. Plenty of courage, I see. Not a bad mind either. There's talent, oh my goodness, yes — and a nice thirst to prove yourself, now that's interesting... So where shall I put you? You’ve been wondering whether I put you in the right House. Yes... you were particularly difficult to place ━ <#${channel.id}>*`)
        .setImage('https://pa1.narvii.com/6552/b9cc429020179f157a0c99d0c86adf368c613a40_hq.gif')
        .setFooter({ text: `these thoughts of sorting hat gonna be vanished in 15 seconds`, iconURL: 'https://i.imgur.com/26tcTpL.gif' })
        .setColor('2b2d31')

    message.channel.send({ embeds: [sortingHat] }).then((msg) => {
        setTimeout(() => msg.delete().catch((e) => {}), 15000);
        setTimeout(() => message.delete().catch((e) => {}));
    }).catch((err) => {
        throw err;
    })

    message.guild.channels.cache.get('997467514818797649').send(`*<@${message.author.id}> is taking the test now by the sorting hat. So, which house do they belong to?*`).catch(e => {});

    const sortingEmbed = new MessageEmbed()
        .setAuthor({ name: `${message.author.username} is being sorted`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setDescription(`𝑫𝒊𝒔𝒄𝒐𝒗𝒆𝒓 𝒚𝒐𝒖𝒓 𝑯𝒐𝒈𝒘𝒂𝒓𝒕𝒔 𝒉𝒐𝒖𝒔𝒆 𝒐𝒏 𝑾𝒊𝒛𝒂𝒓𝒅𝒊𝒏𝒈 𝑾𝒐𝒓𝒍𝒅\n\nHogwarts was founded over a thousand years ago by four powerful wizards: Godric Gryffindor, Salazar Slytherin, Rowena Ravenclaw and Helga Hufflepuff. They chose to split the students into four ‘houses’, each bearing their surnames and featuring young wizards and witches who displayed abilities and personalities they wanted to nurture.\n\nTo do this, Godric Gryffindor used his magical hat – henceforward known as the Sorting Hat – to decide which children should go into which house, and so it has been ever since with a yearly Sorting Ceremony that places each new pupil into their own new home.\n\nThe four houses have different entry requirements, and nobody summed them up better than the old Sorting Hat itself in its welcoming song...\n\nSo, which house do you belong to?\nAre you Gryffindor? Are you Hufflepuff? Are you Slytherin? Are you Ravenclaw?\n\n*Take a screenshot within your name there and send the exact result of your test here to get your house role and access on this server:*`)
        .setImage('https://i.imgur.com/cLItEMI.png')
        .setColor("2b2d31")
    
    let sortingButton = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Take The Test Now')
                .setURL('https://www.wizardingworld.com/profile')
        )
    
    await channel.send({
        content: "_ _",
        embeds: [sortingEmbed],
        components: [sortingButton]
    }).catch((e) => {});

    await message.delete().catch((e) => {});
}
  
module.exports.help = {
    name: 'sortinghat'
}