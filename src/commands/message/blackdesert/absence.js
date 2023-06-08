const { EmbedBuilder } = require("discord.js");
module.exports = new Object({
    name: "absence",
    description: "absence.",
    category: "Blackdesert",
    usage: "",
    cooldown: 0,
    aliases: ['vacation'],
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

        const sanctumHall = '1060992670035619931'

        if (!sanctumHall.includes(message.channel.id)) return message.channel.send(`*You can't send a vacancy letter from here, go back to <#1060992670035619931> to send!*`).then((msg) => {
            setTimeout(() => msg.delete().catch((e) => { }), 5000);
            setTimeout(() => message.delete().catch((e) => { }));
        }).catch((err) => {
            throw err;
        })

        if (!args[0]) return message.channel.send(`*You can't let the vacancy letter be an empty-ink letter. Do write __days__ __reason__\nex: \`!absence\` \`14\` \`going to buy milk\`*`).then((msg) => {
            setTimeout(() => msg.delete().catch((e) => { }), 10000);
            setTimeout(() => message.delete().catch((e) => { }));
        }).catch((err) => {
            throw err;
        })

        const days = args[0];

        if (!days) return message.channel.send({ content: "You forgot to put days off for . Do write __days__ __reason__\nex: \`!absence\` \`14\` \`going to buy milk\`" }).then((msg) => {
            setTimeout(() => msg.delete().catch((e) => { }), 10000);
            setTimeout(() => message.delete().catch((e) => { }));
        }).catch((err) => {
            throw err;
        })

        const words = args.slice(1).join(" ");

        if (!words) return message.channel.send({ content: "You forgot to put the reason for your days off. Do write __days__ __reason__\nex: \`!absence\` \`14\` \`going to buy milk\`" }).then((msg) => {
            setTimeout(() => msg.delete().catch((e) => { }), 10000);
            setTimeout(() => message.delete().catch((e) => { }));
        }).catch((err) => {
            throw err;
        })

        await message.delete().catch((e) => { });

        const absenceNote = new EmbedBuilder()
            .setAuthor({ name: "Vacancy Letter" })
            .setDescription(`*Dear Elders,\nRequested Day Off: __${days} Day(s)__\n\n${words}\n\nYours sincerely,*\n***${message.member.displayName}***`)
            .setColor('2b2d31')
            .setThumbnail('https://i.imgur.com/EpDcu9d.png')

        if (message.channel.id === sanctumHall) {
            message.guild.channels.cache.get('1076767724224659526').send({ embeds: [absenceNote] }).catch((e) => { });
            message.channel.send(`*The vacancy letter has been delivered to the Elders, dear* ***${message.member.displayName}***\n*All your privacy will be kept safe under them*`)
            message.delete().catch((e) => { });
        } else {
            return;
        }

    }
})





