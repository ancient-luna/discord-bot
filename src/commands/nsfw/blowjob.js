const { MessageEmbed, Client } = require("discord.js");
const { MessageButton } = require("discord-buttons");
const axios = require('axios');

module.exports.run = async (Client, message, args) => {
    var errMessage = "This is not an NSFW Channel";
    if (!message.channel.nsfw) {
        message.react("💢");

        return message.reply(errMessage).then((msg) => {
            setTimeout(() => msg.delete(), 5000);
        });
    }
    const responseOne = await axios.get('https://nekos.life/api/v2/img/blowjob');
    const responseTwo = await axios.get('https://nekos.life/api/v2/img/bj');

    const genre = [responseOne.data, responseTwo.data];
    const random = genre[Math.floor(Math.random() * genre.length)];
    const blowjob = random;

    const embed = new MessageEmbed()
      .setTitle(`Blown Away!`)
      .setDescription(`Mm.. give me more your milk <@${message.author.id}> ...`)
      .setColor('#985ce7')
      .setImage(blowjob.url)

    message.channel.send(embed)
}

module.exports.help = {
    name: 'blowjob'
}