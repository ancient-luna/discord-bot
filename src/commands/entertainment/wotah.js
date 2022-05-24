const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {

    let IMGtomato = new MessageAttachment("src/assets/tomatooo.png")

    await message.channel.send({
        content: "+1 aBOoWoAahhHHhH~ for <@737703309707706431>\n⁣",
        files: [IMGtomato]
    }).catch((e) => {});
}

module.exports.help = {
    name: 'wotah',
    aliases: ['tomato']
}