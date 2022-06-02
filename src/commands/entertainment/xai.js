const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {

    let IMGxai = new MessageAttachment("src/assets/react/xaiapprob.png")

    await message.channel.send({
        content: "+1 thumb from <@457486784121536523>\n⁣",
        files: [IMGxai]
    }).catch((e) => {});
}

module.exports.help = {
    name: 'approb',
    aliases: ['thumb']
}