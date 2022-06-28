const { MessageEmbed } = require('discord.js');
const axios =  require('axios');

module.exports.run = async (client, message, args) => {

    const response = await axios.get('https://api.adviceslip.com/advice');

    let advice = new MessageEmbed()
        .setAuthor({ name: `${message.author.username} might need this advice 🗒️`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setDescription(`${response.data.slip.advice}`)
        .setColor("7289da")

    await message.reply({ embeds: [advice] }).catch((e) => {});
}

module.exports.help = {
    name: 'lifeadvice',
    aliases: ['advice']
}