const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {

    let loadingTxt = await message.channel.send(`<:xmot_spray:991166260341637140> *spraying o wo' ooh bo' ooh ...*`);

    let SRCtomato = new MessageAttachment("src/assets/react/tomatooo.mp4")

    await loadingTxt.edit({
        content: "+9999999 peanut destruction by flying smol piece of <@946058733954433085> <:xemot_meow_fine_fire:1063723426155606067>",
        files: [SRCtomato]
    }).then((msg) => {
        msg.react('🔥').catch((e) => {});
    }).catch((e) => {});
}

module.exports.help = {
    name: 'emotionaldamage',
    aliases: ['spray', 'destruction', 'boom', 'peanut']
}