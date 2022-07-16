const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('To whom you short to?').catch((e) => {});

    let role = message.mentions.roles.first();

    if (!role) return message.reply(`They're chosen but to which house they belong to?`).catch((e) => {});

    const welcomeHall = new MessageEmbed()
        .setAuthor({ name: "𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐇𝐨𝐠𝐰𝐚𝐫𝐭𝐬", iconURL: "https://i.imgur.com/c2u3J0G.png" })
        .setTitle('ℭ𝔬𝔲𝔯𝔞𝔤𝔢, 𝔅𝔯𝔞𝔳𝔢𝔯𝔶, 𝔑𝔢𝔯𝔳𝔢')
        .setDescription(`You probably know that some of Gryffindor’s most renowned members include Albus Dumbledore and Harry Potter. But did you know the sword of Gryffindor was made a thousand years ago by goblins, or that Head of House Minerva McGonagall’s hobbies include correcting articles in Transfiguration Today and supporting the Montrose Magpies?\n\nRegistered Name: __**${target.user.username}**__\nHouse Pride: **${role}**`)
        .setColor("2f3136")
        .setFooter({ text: "Year"})
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/1eVo0IN.gif')

    message.guild.channels.cache.get('997467514818797649').send({
        content: `*<@${target.user.id}> sorted as ${role}!*\n_ _`,
        embeds: [welcomeHall],
    }).then(target.roles.add(role)).catch(e => {});
    
    message.guild.channels.cache.get('997464573177233468').send(`*<@${target.user.id}> is entering the dormitory of Gryffindor ...*`).catch(e => {});

    const welcomeButton = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle("LINK")
                .setLabel("Go to your Dormitory")
                .setURL("https://discord.com/channels/447069790150852609/997464573177233468")
    )

    const welcomeCard = new MessageEmbed()
        .setAuthor({ name: "𝐆𝐫𝐲𝐟𝐟𝐢𝐧𝐝𝐨𝐫", iconURL: "https://i.imgur.com/wo6MjsY.png" })
        .setTitle('ℭ𝔬𝔲𝔯𝔞𝔤𝔢, 𝔅𝔯𝔞𝔳𝔢𝔯𝔶, 𝔑𝔢𝔯𝔳𝔢')
        .setDescription(`A message from your prefect:\n\n*Congratulations! I’m Prefect Percy Weasley, and I’m delighted to welcome you to **[GRYFFINDOR HOUSE](https://discord.com/channels/447069790150852609/997487649399001099)**. Our emblem is the lion, the bravest of all creatures; our house colors are scarlet and gold, and our common room lies up in Gryffindor Tower.\n\nNow, there are a few things you should know about Gryffindor house, as well. Almost everyone says that we are arrogant and too brave for our own good, but we're not. I admit, we've produced our fair share of Dark Wizards and Witches, but there are many other members you should notice. How about Albus Dumbledore? He was the best headmaster Hogwarts ever had. And don't forget about our founder, Godric Gryffindor, who was the bravest of all the Hogwarts Founders.\n\nAnd what else do you need to know? Oh yes, the entrance to the common room is concealed under the portrait of the Fat Lady, on the lavish Gryffindor Landing. You must present the Fat Lady with the correct password of the week, otherwise you will have to wait the day for another student to come by and pass you the code. You will hear other houses boast of their security arrangements and concealed ways, such as the Hufflepuff barrels, the concealed Slytherin door, and the Ravenclaw questions, but the Fat lady is the best guardian we've ever had, unlike the pompous Sir Cadogan.\n\nI hope you are a good Quidditch player. We Gryffindors are famous for winning the Hogwarts Quidditch Cup four times in a row, beating Slytherin's record of three cups.\n\nI won’t keep you long, as all you need to do to find out more about your house is to follow Harry Potter and his friends as I lead them up to their dormitories. Enjoy your time at Hogwarts – but how could you fail to? You’ve become part of the best house in the school.*`)
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
    name: 'gryffindor'
}