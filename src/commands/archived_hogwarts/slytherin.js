const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('To whom you short to?').catch((e) => {});

    let role = '997455304243564607';

    const welcomeHall = new MessageEmbed()
        .setAuthor({ name: "𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐇𝐨𝐠𝐰𝐚𝐫𝐭𝐬", iconURL: "https://i.imgur.com/c2u3J0G.png" })
        .setTitle('𝔓𝔯𝔦𝔡𝔢, 𝔄𝔪𝔟𝔦𝔱𝔦𝔬𝔫, ℭ𝔲𝔫𝔫𝔦𝔫𝔤')
        .setDescription(`You probably know that some of Slytherin’s most renowned members include Severus Snape and Bellatrix Lestrange. But did you know Merlin himself was a Slytherin, or that according to legend, the ribbon of a First Class Order of Merlin is green to reflect his Hogwarts house?\n\nRegistered Name: __**${target.user.username}**__\nHouse Pride: **<@&${role}>**`)
        .setColor("2b2d31")
        .setFooter({ text: "Year"})
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/fpPc0n1.gif')

    message.guild.channels.cache.get('997467514818797649').send({
        content: `*<@${target.user.id}> sorted as <@&${role}>!*\n_ _`,
        embeds: [welcomeHall],
    }).then(target.roles.add(role)).catch(e => {});
    
    message.guild.channels.cache.get('997466926668316704').send(`*<@${target.user.id}> is entering the dormitory of Slytherin ...*`).catch(e => {});

    const welcomeButton = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle("LINK")
                .setLabel("Go to your Dormitory")
                .setURL("https://discord.com/channels/447069790150852609/997466926668316704")
    )

    const welcomeCard = new MessageEmbed()
        .setAuthor({ name: "𝐒𝐥𝐲𝐭𝐡𝐞𝐫𝐢𝐧", iconURL: "https://i.imgur.com/dTDdlod.png" })
        .setTitle('𝔓𝔯𝔦𝔡𝔢, 𝔄𝔪𝔟𝔦𝔱𝔦𝔬𝔫, ℭ𝔲𝔫𝔫𝔦𝔫𝔤')
        .setDescription(`A message from your prefect:\n\n*Congratulations! I’m Prefect Gemma Farley, and I’m delighted to welcome you to **[SLYTHERIN HOUSE](https://discord.com/channels/447069790150852609/997487735130558564)**. Our emblem is the serpent, the wisest of creatures; our house colours are emerald green and silver, and our common room lies behind a concealed entrance down in the dungeons. As you’ll see, its windows look out into the depths of the Hogwarts lake. We often see the giant squid swooshing by – and sometimes more interesting creatures. We like to feel that our hangout has the aura of a mysterious, underwater shipwreck.\n\nNow, there are a few things you should know about Slytherin – and a few you should forget. Firstly, let’s dispel a few myths. You might have heard rumours about Slytherin house – that we’re all into the Dark Arts, and will only talk to you if your great-grandfather was a famous wizard, and rubbish like that. Well, you don’t want to believe everything you hear from competing houses. I’m not denying that we’ve produced our share of Dark wizards, but so have the other three houses – they just don’t like admitting it. And yes, we have traditionally tended to take students who come from long lines of witches and wizards, but nowadays you’ll find plenty of people in Slytherin house who have at least one Muggle parent. Here’s a little-known fact that the other three houses don’t bring up much: Merlin was a Slytherin. Yes, Merlin himself, the most famous wizard in history! He learned all he knew in this very house! Do you want to follow in the footsteps of Merlin? Or would you rather sit at the old desk of that illustrious ex-Hufflepuff, Eglantine Puffett, inventor of the Self-Soaping Dishcloth? I didn’t think so.\n\nA few more things you might need to know: our house ghost is the Bloody Baron. If you get on the right side of him he’ll sometimes agree to frighten people for you. Just don’t ask him how he got bloodstained; he doesn’t like it.\n\nThe password to the common room changes every fortnight. Keep an eye on the noticeboard. Never bring anyone from another house into our common room or tell them our password. No outsider has entered it for more than seven centuries.\n\nWell, I think that’s all for now. I’m sure you’ll like our dormitories. We sleep in ancient four-posters with green silk hangings, and bedspreads embroidered with silver thread. Medieval tapestries depicting the adventures of famous Slytherins cover the walls, and silver lanterns hang from the ceilings. You’ll sleep well; it’s very soothing, listening to the lake water lapping against the windows at night.*`)
        .setImage('https://images.ctfassets.net/usf1vwtuqyxm/7lfJsMSBaSeVy8t0jxTJgZ/4b77d2ba77c04aee2363beb5abd66616/JKR_signature_white-1.png')
        .setColor("2b2d31")
        
    await target.user.send({
        content: "_ _",
        embeds: [welcomeCard],
        components: [welcomeButton]
    }).catch(e => {});
    
    await message.delete().catch((e) => {});
}

module.exports.help = {
    name: 'slytherin'
}