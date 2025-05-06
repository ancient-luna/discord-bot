const { AttachmentBuilder } = require('discord.js');
module.exports = new Object({
    name: "spray",
    description: "li'el pean is attacking!",
    category: "Fun",
    usage: "",
    cooldown: 0,
    aliases: ['fact', 'emotionaldamage', 'aki', 'hany'],
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
        let loadingTxt = await message.channel.send(`<a:mm_spray:1369204415298408448> *spraying o wo' ooh bo' ooh ...*`);
        let SRCtomato = new AttachmentBuilder("src/assets/react/tomatooo.mp4")
        await loadingTxt.edit({
            content: "<@396683781119148032> threw facts and dealt ...",
            files: [SRCtomato]
        });
        await message.channel.send('# 𝒆𝒎𝒐𝒕𝒊𝒐𝒏𝒂𝒍 𝒅𝒂𝒎𝒂𝒈𝒆').then(msg => {
            // msg.react('<a:mm_spray:1369204415298408448>'),
            msg.react('💔')
        });
    }
});