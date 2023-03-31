const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {

    const letterGryffindor = '997464813049487470'
    const letterHufflepuff = '997466111631167488'
    const letterRavenclaw = '997466556483244194'
    const letterSlytherin = '997466944024367135'

    const letterHouses = [
        letterGryffindor,
        letterHufflepuff,
        letterRavenclaw,
        letterSlytherin
    ]

    if (!letterHouses.includes(message.channel.id)) return message.channel.send(`*You can't send an owl letter from here, go back to your owl letter's dormitory to send!*`).then((msg) => {
        setTimeout(() => msg.delete().catch((e) => {}), 5000);
        setTimeout(() => message.delete().catch((e) => {}));
    }).catch((err) => {
        throw err;
    })

    if (!args[0]) return message.channel.send(`*You can't let the letter be an empty-ink letter*`).then((msg) => {
        setTimeout(() => msg.delete().catch((e) => {}), 5000);
        setTimeout(() => message.delete().catch((e) => {}));
    }).catch((err) => {
        throw err;
    })
    
    const words = args.slice(0).join(" ");

    await message.delete().catch((e) => {});

    const wordGryffindor = new MessageEmbed()
        .setAuthor({ name: "𝐀 𝐥𝐞𝐭𝐭𝐞𝐫 𝐟𝐫𝐨𝐦 𝐆𝐫𝐲𝐟𝐟𝐢𝐧𝐝𝐨𝐫 𝐝𝐨𝐫𝐦𝐢𝐭𝐨𝐫𝐲", iconURL: "https://i.imgur.com/wo6MjsY.png" })
        .setDescription(`*Dear Witchcraft and Wizardry,\n\n${words}\n\nYours sincerely,\n𝒜𝓃 𝒰𝓃𝓀𝓃𝑜𝓌𝓃 𝒮𝓉𝓊𝒹𝑒𝓃𝓉*`)
        .setColor('2f3136')
        .setThumbnail('https://cdn.shopify.com/s/files/1/0514/6332/3817/products/PL00010246_7_ab9687c6-efa5-4ed1-9453-b909f980acfe_grande.png?v=1624519742')

    const wordHufflepuff = new MessageEmbed()
        .setAuthor({ name: "𝐀 𝐥𝐞𝐭𝐭𝐞𝐫 𝐟𝐫𝐨𝐦 𝐇𝐮𝐟𝐟𝐥𝐞𝐩𝐮𝐟𝐟 𝐝𝐨𝐫𝐦𝐢𝐭𝐨𝐫𝐲", iconURL: "https://i.imgur.com/1Ejfiqy.png" })
        .setDescription(`*Dear Witchcraft and Wizardry,\n\n${words}\n\nYours sincerely,\n𝒜𝓃 𝒰𝓃𝓀𝓃𝑜𝓌𝓃 𝒮𝓉𝓊𝒹𝑒𝓃𝓉*`)
        .setColor('2f3136')
        .setThumbnail('https://cdn.shopify.com/s/files/1/0514/6332/3817/products/PL00010246_7_ab9687c6-efa5-4ed1-9453-b909f980acfe_grande.png?v=1624519742')

    const wordRavenclaw = new MessageEmbed()
        .setAuthor({ name: "𝐀 𝐥𝐞𝐭𝐭𝐞𝐫 𝐟𝐫𝐨𝐦 𝐑𝐚𝐯𝐞𝐧𝐜𝐥𝐚𝐰 𝐝𝐨𝐫𝐦𝐢𝐭𝐨𝐫𝐲", iconURL: "https://i.imgur.com/mRbAezD.png" })
        .setDescription(`*Dear Witchcraft and Wizardry,\n\n${words}\n\nYours sincerely,\n𝒜𝓃 𝒰𝓃𝓀𝓃𝑜𝓌𝓃 𝒮𝓉𝓊𝒹𝑒𝓃𝓉*`)
        .setColor('2f3136')
        .setThumbnail('https://cdn.shopify.com/s/files/1/0514/6332/3817/products/PL00010246_7_ab9687c6-efa5-4ed1-9453-b909f980acfe_grande.png?v=1624519742')

    const wordSlytherin = new MessageEmbed()
        .setAuthor({ name: "𝐀 𝐥𝐞𝐭𝐭𝐞𝐫 𝐟𝐫𝐨𝐦 𝐒𝐥𝐲𝐭𝐡𝐞𝐫𝐢𝐧 𝐝𝐨𝐫𝐦𝐢𝐭𝐨𝐫𝐲", iconURL: "https://i.imgur.com/dTDdlod.png" })
        .setDescription(`*Dear Witchcraft and Wizardry,\n\n${words}\n\nYours sincerely,\n𝒜𝓃 𝒰𝓃𝓀𝓃𝑜𝓌𝓃 𝒮𝓉𝓊𝒹𝑒𝓃𝓉*`)
        .setColor('2f3136')
        .setThumbnail('https://cdn.shopify.com/s/files/1/0514/6332/3817/products/PL00010246_7_ab9687c6-efa5-4ed1-9453-b909f980acfe_grande.png?v=1624519742')

    if (message.channel.id === letterGryffindor) {
        message.guild.channels.cache.get('997467514818797649').send({
            content: `_ _`,
            embeds: [wordGryffindor]
        }).catch((e) => {});
        message.channel.send(`*The letter has been delivered anonymously to <#997467514818797649> by your owl letter*`).then((msg) => {
            setTimeout(() => msg.delete().catch((e) => {}), 5000);
            setTimeout(() => message.delete().catch((e) => {}));
        }).catch((err) => {
            throw err;
        })
    } if (message.channel.id === letterHufflepuff) {
        message.guild.channels.cache.get('997467514818797649').send({
            content: `_ _`,
            embeds: [wordHufflepuff]
        }).catch((e) => {});
        message.channel.send(`*The letter has been delivered anonymously to <#997467514818797649> by your owl letter*`).then((msg) => {
            setTimeout(() => msg.delete().catch((e) => {}), 5000);
            setTimeout(() => message.delete().catch((e) => {}));
        }).catch((err) => {
            throw err;
        })
    } if (message.channel.id === letterRavenclaw) {
        message.guild.channels.cache.get('997467514818797649').send({
            content: `_ _`,
            embeds: [wordRavenclaw]
        }).catch((e) => {});
        message.channel.send(`*The letter has been delivered anonymously to <#997467514818797649> by your owl letter*`).then((msg) => {
            setTimeout(() => msg.delete().catch((e) => {}), 5000);
            setTimeout(() => message.delete().catch((e) => {}));
        }).catch((err) => {
            throw err;
        })
    } if (message.channel.id === letterSlytherin) {
        message.guild.channels.cache.get('997467514818797649').send({
            content: `_ _`,
            embeds: [wordSlytherin]
        }).catch((e) => {});
        message.channel.send(`*The letter has been delivered anonymously to <#997467514818797649> by your owl letter*`).then((msg) => {
            setTimeout(() => msg.delete().catch((e) => {}), 5000);
            setTimeout(() => message.delete().catch((e) => {}));
        }).catch((err) => {
            throw err;
        })
    } else {
        return;
    }
}

module.exports.help = {
    name: 'sendowl'
}