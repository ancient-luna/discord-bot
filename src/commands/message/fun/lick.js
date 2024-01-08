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
        let target = message.mentions.members.first();
        
        if (!target) {
            message.react("❓").catch((e) => { });
            return message.reply({ content: "How can *He* licks when theres no one to lick on!\n **Hurry! Mention one, cause He cant wait to lick sumthin**" }).then((msg) => {
                setTimeout(() => msg.delete().catch((e) => { }), 5000);
            });
        }

        const cntnTxt = [ 'feet to toe', 'that kind of part', 'ear to whimper', 'tongue deeply', 'neck softly' ]
        const rndmMlem = cntnTxt[Math.floor(Math.random() * cntnTxt.length)];
        const mlemIMG = 'https://i.imgur.com/HHnLLgP.gif';
        const mlemTxt = `***Mmhmm~ SLuurRpP mmmhm slurp SLurpP*** ...\n<@260390499834265610> *starts [licking](${mlemIMG}) <@${target.user.id}>'s ${rndmMlem}* 💦\n_ _`

        const smileIMG = 'https://i.imgur.com/0XVrYTH.jpg';
        const smileTxt = `this time <@260390499834265610> had enough\nand just [smiling](${smileIMG}) instead of mlemming\n_ _`;

        const rndmNumber = Math.random();
        const mlemProbability = 0.8;
        const rndmMlemTxt = rndmNumber <= mlemProbability ? mlemTxt : smileTxt;

        await message.react("💦").catch((e) => { });
        await message.channel.send({
            content: `${rndmMlemTxt}`
        }).catch((e) => { });
    }
});