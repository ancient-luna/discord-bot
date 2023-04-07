const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {

    let loadingTxt = await message.channel.send(`<:xmot_spray:991166260341637140> *dreaming on ...*`);

    let SRCdream = new MessageAttachment("src/assets/df/dreamonboost.mp4")

    await loadingTxt.edit({
        content: "Sing with me, sing for a year\nSing for the laughter, and sing for the tear",
        files: [SRCdream]
    }).then((msg) => {
        msg.react('❤️‍🔥').catch((e) => {});
    }).catch((e) => {});
}

module.exports.help = {
    name: 'dreamon'
}