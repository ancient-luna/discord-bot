const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = new Object({
    name: "coinflip",
    description: "toss your luck",
    category: "general",
    usage: `coinflip`,
    cooldown: 0,
    aliases: [],
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

        const head = new EmbedBuilder()
            .setTitle('# 𝕳𝖊𝖆𝖉')
            .setDescription(`-# ${message.member.displayName} flipped the coin and ...\nthe result is **Head**`)
            .setColor(client.config.embedColorTrans)
            .setThumbnail('https://i.imgur.com/X61MBiD.png')

        const tail = new EmbedBuilder()
            .setTitle('# 𝕿𝖆𝖎𝖑')
            .setDescription(`-# ${message.member.displayName} flipped the coin and ...\nthe result is **Tail**`)
            .setColor(client.config.embedColorTrans)
            .setThumbnail('https://i.imgur.com/nlYa0I3.png')

        const coin = [head, tail];

        const flipped = coin[Math.floor(Math.random() * coin.length)];

        const msg = await message.channel.send({ content: `<a:u_load:1334900265953923085> flipping the coin` });

        setTimeout(() => {
            msg.edit({ content: null, embeds: [flipped] });
        }, 5000);
    }
});