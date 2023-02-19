const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('To whom you short to?').catch((e) => {});

    let role = '997455047799611422';

    const welcomeHall = new MessageEmbed()
        .setAuthor({ name: "𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐇𝐨𝐠𝐰𝐚𝐫𝐭𝐬", iconURL: "https://i.imgur.com/c2u3J0G.png" })
        .setTitle('𝔇𝔢𝔡𝔦𝔠𝔞𝔱𝔦𝔬𝔫, 𝔓𝔞𝔱𝔦𝔢𝔫𝔠𝔢, 𝔏𝔬𝔶𝔞𝔩𝔱𝔶')
        .setDescription(`You probably know that some of Hufflepuff’s most renowned members include Nymphadora Tonks and Cedric Diggory. But did you know that Hufflepuff’s house ghost, the Fat Friar, still resents the fact he was never made a cardinal? Or that Hufflepuff has produced the fewest Dark wizards of any house at Hogwarts?\n\nRegistered Name: __**${target.user.username}**__\nHouse Pride: **<@&${role}>**`)
        .setColor("2f3136")
        .setFooter({ text: "Year"})
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/bPyeawa.gif')

    message.guild.channels.cache.get('997467514818797649').send({
        content: `*<@${target.user.id}> sorted as <@&${role}>!*\n_ _`,
        embeds: [welcomeHall],
    }).then(target.roles.add(role)).catch(e => {});
    
    message.guild.channels.cache.get('997466088440872971').send(`*<@${target.user.id}> is entering the dormitory of Hufflepuff ...*`).catch(e => {});

    const welcomeButton = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle("LINK")
                .setLabel("Go to your Dormitory")
                .setURL("https://discord.com/channels/447069790150852609/997466088440872971")
    )

    const welcomeCard = new MessageEmbed()
        .setAuthor({ name: "𝐇𝐮𝐟𝐟𝐥𝐞𝐩𝐮𝐟𝐟", iconURL: "https://i.imgur.com/1Ejfiqy.png" })
        .setTitle('𝔇𝔢𝔡𝔦𝔠𝔞𝔱𝔦𝔬𝔫, 𝔓𝔞𝔱𝔦𝔢𝔫𝔠𝔢, 𝔏𝔬𝔶𝔞𝔩𝔱𝔶')
        .setDescription(`A message from your prefect:\n\n*Congratulations! I’m Prefect Gabriel Truman, and I’m delighted to welcome you to **[HUFFLEPUFF HOUSE](https://discord.com/channels/447069790150852609/997487683398029312)**. Our emblem is the badger, an animal that is often underestimated, because it lives quietly until attacked, but which, when provoked, can fight off animals much larger than itself, including wolves. Our house colours are yellow and black, and our common room lies one floor below the ground, on the same corridor as the kitchens.\n\nNow, there are a few things you should know about Hufflepuff house. First of all, let’s deal with a perennial myth about the place, which is that we’re the least clever house. WRONG. Hufflepuff is certainly the least boastful house, but we’ve produced just as many brilliant witches and wizards as any other. Want proof? Look up Grogan Stump, one of the most popular Ministers for Magic of all time. He was a Hufflepuff – as were the successful Ministers Artemesia Lufkin and Dugald McPhail. Then there’s the world authority on magical creatures, Newt Scamander; Bridget Wenlock, the famous thirteenth-century Arithmancer who first discovered the magical properties of the number seven, and Hengist of Woodcroft, who founded the all-wizarding village of Hogsmeade, which lies very near Hogwarts School. Hufflepuffs all.\n\nSo, as you can see, we’ve produced more than our fair share of powerful, brilliant and daring witches and wizards, but, just because we don’t shout about it, we don’t get the credit we deserve. Ravenclaws, in particular, assume that any outstanding achiever must have come from their house. I got into big trouble during my third year for duelling a Ravenclaw prefect who insisted that Bridget Wenlock had come from his house, not mine. I should have got a week of detentions, but Professor Sprout let me off with a warning and a box of coconut ice.\n\nHufflepuffs are trustworthy and loyal. We don’t shoot our mouths off, but cross us at your peril; like our emblem, the badger, we will protect ourselves, our friends and our families against all-comers. Nobody intimidates us.\n\nI think that’s nearly everything. I must say, I hope some of you are good Quidditch players. Hufflepuff hasn’t done as well as I’d like in the Quidditch tournament lately.\n\nYou should sleep comfortably. We’re protected from storms and wind down in our dormitories; we never have the disturbed nights those in the towers sometimes experience.\n\nAnd once again: congratulations on becoming a member of the friendliest, most decent and most tenacious house of them all.*`)
        .setImage('https://images.ctfassets.net/usf1vwtuqyxm/7lfJsMSBaSeVy8t0jxTJgZ/4b77d2ba77c04aee2363beb5abd66616/JKR_signature_white-1.png')
        .setColor("2f3136")
        
    await target.user.send({
        content: "_ _",
        embeds: [welcomeCard],
        components: [welcomeButton]
    }).catch(e => {});
    
    await message.delete().catch((e) => {});
}

module.exports.help = {
    name: 'hufflepuff'
}