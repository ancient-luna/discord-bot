const { EmbedBuilder, AttachmentBuilder, ContainerBuilder, TextDisplayBuilder, SectionBuilder, MessageFlags } = require('discord.js');

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
    permissions: { client: [], user: [], dev: false, },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        const textFlipping = new TextDisplayBuilder().setContent(`flipping the coin <a:u_load:1334900265953923085>`)

        const containerHead = new ContainerBuilder()
        const textHead = new TextDisplayBuilder().setContent(`# 𝕳𝖊𝖆𝖉\n-# ${message.member.displayName} flipped the coin and ...\nthe result is **Head**`)
        const sectionHead = new SectionBuilder()
            .addTextDisplayComponents(textHead)
            .setThumbnailAccessory(thumbnail => thumbnail
                .setURL('https://i.imgur.com/X61MBiD.png')
            );

        const containerTail = new ContainerBuilder()
        const textTail = new TextDisplayBuilder().setContent(`# 𝕿𝖆𝖎𝖑\n-# ${message.member.displayName} flipped the coin and ...\nthe result is **Tail**`)
        const sectionTail = new SectionBuilder()
            .addTextDisplayComponents(textTail)
            .setThumbnailAccessory(thumbnail => thumbnail
                .setURL('https://i.imgur.com/nlYa0I3.png')
            );

        const head = containerHead.addSectionComponents(sectionHead)
        const tail = containerTail.addSectionComponents(sectionTail)
        
        const coin = [head, tail];
        const flipped = coin[Math.floor(Math.random() * coin.length)];

        const msg = await message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [textFlipping] })

        setTimeout(() => {
            msg.edit({ flags: MessageFlags.IsComponentsV2, components: [flipped] });
        }, 5000);
    }
});