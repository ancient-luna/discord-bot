const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {

    let loadingTxt = await message.channel.send(`<:xmot_spray:991166260341637140> *spraying o wo' ooh bo' ooh ...*`);

    let SRCtomato = new MessageAttachment("src/assets/react/tomatooo.mp4")

    await loadingTxt.edit({
        content: "+9999999 destruction from <@737703309707706431>",
        files: [SRCtomato]
    }).then((msg) => {
        msg.react('<:xemot_bib_elmo_burn_fire:984026957039665182>').catch((e) => {});
    }).catch((e) => {});
}

module.exports.help = {
    name: 'tomato',
    aliases: ['spray', 'destruct']
}