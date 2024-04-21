const { AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "gremlin",
    description: "gremlin.",
    category: "Fun",
    usage: "",
    cooldown: 0,
    aliases: ['grrr'],
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
        let IMGgrrr = new AttachmentBuilder("src/assets/react/gremlin.gif")
        await message.channel.send({
            content: "Oh no! <@200511009922744320> the Gremlin is here\n*Why you steal my point?!* ***Gggrrrrr*** :anger:\n⁣",
            files: [IMGgrrr]
        }).catch((e) => { });
    }
});