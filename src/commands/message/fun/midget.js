const { AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "midget",
    description: "midget.",
    category: "Fun",
    usage: "",
    cooldown: 0,
    aliases: ['relic'],
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
        let IMGrelic = new AttachmentBuilder("src/assets/react/midget.png")
        await message.channel.send({
            content: "Wild midget <@431963243137728532> appeared to expand her cult*\n***RELICS?!!*** *(LFP) Looking For Pragment :>*\n⁣",
            files: [IMGrelic]
        }).catch((e) => { });
    }
});