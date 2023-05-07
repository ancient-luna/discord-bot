const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('To whom you short to?').catch((e) => {});

    let role = '997455288741417001';

    const welcomeHall = new MessageEmbed()
        .setAuthor({ name: "𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐇𝐨𝐠𝐰𝐚𝐫𝐭𝐬", iconURL: "https://i.imgur.com/c2u3J0G.png" })
        .setTitle('𝔚𝔦𝔱, 𝔏𝔢𝔞𝔯𝔫𝔦𝔫𝔤, 𝔚𝔦𝔰𝔡𝔬𝔪')
        .setDescription(`You probably know that some of Ravenclaw’s most renowned members include Gilderoy Lockhart and Luna Lovegood. But did you know Ravenclaw’s Grey Lady is the least talkative Hogwarts house ghost, or that Ravenclaw’s common room boasts the most stunning views of the castle grounds?\n\nRegistered Name: __**${target.user.username}**__\nHouse Pride: **<@&${role}>**`)
        .setColor("2b2d31")
        .setFooter({ text: "Year"})
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/nsXK7bP.gif')

    message.guild.channels.cache.get('997467514818797649').send({
        content: `*<@${target.user.id}> sorted as <@&${role}>!*\n_ _`,
        embeds: [welcomeHall],
    }).then(target.roles.add(role)).catch(e => {});
    
    message.guild.channels.cache.get('997466535192952882').send(`*<@${target.user.id}> is entering the dormitory of Ravenclaw ...*`).catch(e => {});

    const welcomeButton = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle("LINK")
                .setLabel("Go to your Dormitory")
                .setURL("https://discord.com/channels/447069790150852609/997466535192952882")
    )

    const welcomeCard = new MessageEmbed()
        .setAuthor({ name: "𝐑𝐚𝐯𝐞𝐧𝐜𝐥𝐚𝐰", iconURL: "https://i.imgur.com/mRbAezD.png" })
        .setTitle('𝔚𝔦𝔱, 𝔏𝔢𝔞𝔯𝔫𝔦𝔫𝔤, 𝔚𝔦𝔰𝔡𝔬𝔪')
        .setDescription(`A message from your prefect:\n\n*Congratulations! I’m Prefect Robert Hilliard, and I’m delighted to welcome you to **[RAVENCLAW HOUSE](https://discord.com/channels/447069790150852609/997487710321250355)**. Our emblem is the eagle, which soars where others cannot climb; our house colours are blue and bronze, and our common room is found at the top of Ravenclaw Tower, behind a door with an enchanted knocker. The arched windows set into the walls of our circular common room look down at the school grounds: the lake, the Forbidden Forest, the Quidditch pitch and the Herbology gardens. No other house in the school has such stunning views.\n\nWithout wishing to boast, this is the house where the cleverest witches and wizards live. Our founder, Rowena Ravenclaw, prized learning above all else – and so do we. Unlike the other houses, who all have concealed entrances to their common rooms, we don’t need one. The door to our common room lies at the top of a tall, winding staircase. It has no handle, but an enchanted bronze knocker in the shape of an eagle. When you rap on the door, this knocker will ask you a question, and if you can answer it correctly, you are allowed in. This simple barrier has kept out everyone but Ravenclaws for nearly a thousand years.\n\nSome first-years are scared by having to answer the eagle’s questions, but don’t worry. Ravenclaws learn quickly, and you’ll soon enjoy the challenges the door sets. It’s not unusual to find twenty people standing outside the common room door, all trying to work out the answer to the day’s question together. This is a great way to meet fellow Ravenclaws from other years, and to learn from them – although it is a bit annoying if you’ve forgotten your Quidditch robes and need to get in and out in a hurry. In fact, I’d advise you to triple-check your bag for everything you need before leaving Ravenclaw Tower.\n\nAnother cool thing about Ravenclaw is that our people are the most individual – some might even call them eccentrics. But geniuses are often out of step with ordinary folk, and unlike some other houses we could mention, we think you’ve got the right to wear what you like, believe what you want, and say what you feel. We aren’t put off by people who march to a different tune; on the contrary, we value them!\n\nI think that’s nearly everything. Oh yes, our house ghost is the Grey Lady. The rest of the school thinks she never speaks, but she’ll talk to Ravenclaws. She’s particularly useful if you’re lost, or you’ve mislaid something.\n\nI’m sure you’ll have a good night. Our dormitories are in turrets off the main tower; our four-poster beds are covered in sky blue silk eiderdowns and the sound of the wind whistling around the windows is very relaxing.\n\nAnd once again: well done on becoming a member of the cleverest, quirkiest and most interesting house at Hogwarts.*`)
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
    name: 'ravenclaw'
}