const { AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "grrr",
    description: "why you steal my points?!",
    category: "fun",
    usage: `grrr`,
    cooldown: 0,
    aliases: ['gremlin'],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: { client: [], user: [], dev: false, },
    player: { voice: false, active: false, dj: false, },
    
    async execute(client, message, args) {
        let IMGgrrr = new AttachmentBuilder("src/assets/react/gremlin.gif")
        await message.channel.send({
            content: "Oh no! <@200511009922744320> the Gremlin is here\n*Why you steal my point?!* ***Gggrrrrr*** :anger:\n⁣",
            files: [IMGgrrr]
        });
    }
});