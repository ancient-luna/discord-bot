const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {

    let IMGtomato = new MessageAttachment("src/assets/react/tomatooo.png")

    await message.channel.send({
        content: "+1 wo' ooh bo' ooh on <@737703309707706431>\n⁣",
        files: [IMGtomato]
    }).catch((e) => {});
}

module.exports.help = {
    name: 'wotah',
    aliases: ['tomato']
}