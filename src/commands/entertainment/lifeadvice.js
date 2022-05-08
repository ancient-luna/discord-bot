const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {

    let IMGlife = new MessageAttachment("src/assets/dduckdaegood.png")

    await message.channel.send({ files: [IMGlife] }).catch((e) => {});
}

module.exports.help = {
    name: 'lifeadvice'
}