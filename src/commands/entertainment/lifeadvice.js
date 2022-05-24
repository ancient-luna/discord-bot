const { MessageAttachment } = require('discord.js');
const axios =  require('axios');

module.exports.run = async (client, message, args) => {

    const response = await axios.get('https://api.adviceslip.com/advice');

    let IMGlife = new MessageAttachment("src/assets/dduckdaegood.png")

    await message.channel.send({
        content: `${response.data.slip.advice}\n⁣`,
        files: [IMGlife]
    }).catch((e) => {});
}

module.exports.help = {
    name: 'lifeadvice',
    aliases: ['advice']
}