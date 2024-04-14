const { AttachmentBuilder } = require("discord.js");

module.exports = new Object({
    name: "spit",
    description: "spit.",
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
        let IMGpuih = new AttachmentBuilder("src/assets/react/puihh.gif")
        let target = message.mentions.members.first();
        if (!target) {
            message.react("💢").catch((e) => { });
            return message.reply({ content: "How can *She* spits when theres no one to spit on! Mention one 💢" }).then((msg) => {
                setTimeout(() => msg.delete().catch((e) => { }), 5000);
            });
        }
        await message.react("💢").catch((e) => { });
        await message.channel.send({
            content: `***Puih!!*** 💦 <@643945264868098049> spits on <@${target.user.id}>\n_ _`,
            files: [IMGpuih]
        }).catch((e) => { });
    }
});