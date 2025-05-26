const { AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "chichay",
    description: "uiiaiouiiiai",
    category: "fun",
    usage: `chichay`,
    cooldown: 0,
    aliases: ['uiia'],
    examples: [],
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
        let chichay = new AttachmentBuilder("src/assets/react/chichay.gif")
        let uia = new AttachmentBuilder("src/assets/react/u ii a ia chichay uu iai.mp3")
        await message.channel.send({
            content: "⁣",
            files: [chichay, uia]
        });
    }
});