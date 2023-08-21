const { AttachmentBuilder } = require('discord.js');
module.exports = new Object({
    name: "peanut",
    description: "peanut.",
    category: "Fun",
    usage: "",
    cooldown: 0,
    aliases: ['spray', 'emotionaldamage'],
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
        let loadingTxt = await message.channel.send(`<:xmot_spray:991166260341637140> *spraying o wo' ooh bo' ooh ...*`);
        let SRCtomato = new AttachmentBuilder("src/assets/react/tomatooo.mp4")
        await loadingTxt.edit({
            content: "Accidentally threw a peanut and dealt **+9999999 emotional damage** ...",
            files: [SRCtomato]
        }).then((msg) => {
            msg.react('🔥').catch((e) => { });
        }).catch((e) => { });
    }
});