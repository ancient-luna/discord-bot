const { AttachmentBuilder } = require('discord.js');
module.exports = new Object({
    name: "dreamon",
    description: "dreamon.",
    category: "Entertainment",
    usage: "",
    cooldown: 0,
    aliases: [],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        let loadingTxt = await message.channel.send(`<:xmot_spray:991166260341637140> *dreaming on ...*`);
        let SRCdream = new AttachmentBuilder("src/assets/df/dreamonboost.mp4")
        await loadingTxt.edit({
            content: "Sing with me, sing for a year\nSing for the laughter, and sing for the tear",
            files: [SRCdream]
        }).then((msg) => {
            msg.react('❤️‍🔥').catch((e) => { });
        }).catch((e) => { });
    }
});