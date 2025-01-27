const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = new Object({
    name: "coinflip",
    description: "toss your luck",
    category: "general",
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

        const head = new EmbedBuilder()
            .setTitle('ℭ𝔬𝔦𝔫 𝔉𝔩𝔦𝔭: ℌ𝔢𝔞𝔡')
            .setDescription(`${message.member.displayName} flipped the coin and result is **Head**`)
            .setColor(client.config.embedColorTrans)
            .setThumbnail('https://i.imgur.com/X61MBiD.png')
            .setTimestamp()

        const tail = new EmbedBuilder()
            .setTitle('ℭ𝔬𝔦𝔫 𝔉𝔩𝔦𝔭: 𝔗𝔞𝔦𝔩')
            .setDescription(`${message.member.displayName} flipped the coin and result is **Tail**`)
            .setColor(client.config.embedColorTrans)
            .setThumbnail('https://i.imgur.com/nlYa0I3.png')
            .setTimestamp()

        const coin = [head, tail];

        const flipped = coin[Math.floor(Math.random() * coin.length)];

        message.channel.send({ embeds: [flipped] });
    }
});