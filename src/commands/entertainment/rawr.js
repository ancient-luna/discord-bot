const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {

    let IMGrawr = new MessageAttachment("src/assets/react/rawrrr.png")

    await message.channel.send({
        content: "+1 RaawWwRrrRRrrrrRR~ for <@162552850432393216>\n⁣",
        files: [IMGrawr]
    }).catch((e) => {});
}

module.exports.help = {
    name: 'rawr'
}