const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {

    let IMGrawr = new MessageAttachment("src/assets/react/rawrrr.png")

    await message.channel.send({
        content: "scawy <@213718304320126986> has been summoned,\n*RaawWwRrrRRrrrrRR~*\n⁣",
        files: [IMGrawr]
    }).catch((e) => {});
}

module.exports.help = {
    name: 'rawr'
}