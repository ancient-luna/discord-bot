const { AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "rawr",
    description: "rawr.",
    category: "Fun",
    usage: "",
    cooldown: 0,
    aliases: [''],
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
        let IMGrawr = new AttachmentBuilder("src/assets/react/rawrrr.png")
        await message.channel.send({
            content: "scawy <@213718304320126986> has been summoned,\n***RaawWwRrrRRrrrrRR~*** *wanna fite?*\n⁣",
            files: [IMGrawr]
        }).catch((e) => { });
    }
});