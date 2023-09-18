const { AttachmentBuilder } = require("discord.js");

module.exports = new Object({
    name: "lick",
    description: "lick.",
    category: "Fun",
    usage: "",
    cooldown: 0,
    aliases: ['mlem'],
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
        const mentionTxt = [ 'feet', 'arm', 'that kind of part', 'sickle', 'chin', 'cheek', 'ear' ]
        let IMGpuih = new AttachmentBuilder("src/assets/react/mlem.gif")
        let target = message.mentions.members.first();
        if (!target) {
            message.react("💢").catch((e) => { });
            return message.reply({ content: "How can *He* licks when theres no one to lick on!\n *Hurry! Mention one, cause He cant wait to lick sumthin*" }).then((msg) => {
                setTimeout(() => msg.delete().catch((e) => { }), 5000);
            });
        }
        await message.react("💢").catch((e) => { });
        await message.channel.send({
            content: `***Mmhmm~ SLuurRpP mmmhm slurp SLurpP*** ...\n<@260390499834265610> *starts licking <@${target.user.id}>'s ${mentionTxt[Math.floor(Math.random() * mentionTxt.length)]}* 💦\n_ _`,
            files: [IMGpuih]
        }).catch((e) => { });
    }
});