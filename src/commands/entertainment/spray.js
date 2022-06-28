const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {

    message.channel.send({ content: "<:xwota_spray:991166260341637140> spraying o wo' ooh bo' ooh ..." }).then(msg => {
        setTimeout(() => msg.delete(), 3000)
    });

    let SRCtomato = new MessageAttachment("src/assets/react/tomatooo.mp4")

    await message.channel.send({
        content: "+9999999 destruction from <@737703309707706431>",
        files: [SRCtomato]
    }).then((msg) => {
        msg.react('<:xemot_bib_elmo_burn_fire:984026957039665182>').catch((e) => {});
    }).catch((e) => {});
}

module.exports.help = {
    name: 'spray',
    aliases: ['tomato', 'wotah', 'destruct']
}