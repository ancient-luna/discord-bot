const { MessageEmbed } = require('discord.js');
const axios =  require('axios');

module.exports.run = async (client, message, args) => {

    const response = await axios.get('https://api.quotable.io/random');

    let advice = new MessageEmbed()
        .setAuthor({ name: `Quote from ${response.data.author}` })
        .setDescription(`${response.data.content}`)
        .setColor("2f3136")

    await message.reply({ embeds: [advice] }).catch((e) => {});
}

module.exports.help = {
    name: 'inspire',
    aliases: ['quote']
}