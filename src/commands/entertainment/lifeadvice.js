const { MessageEmbed } = require('discord.js');
const axios =  require('axios');

module.exports.run = async (client, message, args) => {

    const response = await axios.get('https://api.adviceslip.com/advice');

    let advice = new MessageEmbed()
        .setAuthor({ name: `${message.author.username} might need this advice 🗒️` })
        .setDescription(`${response.data.slip.advice}`)
        .setColor("2b2d31")

    await message.reply({ embeds: [advice] }).catch((e) => {});
}

module.exports.help = {
    name: 'lifeadvice',
    aliases: ['advice']
}