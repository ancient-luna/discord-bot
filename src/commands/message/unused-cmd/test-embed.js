const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "testemb",
    description: "unused.",
    category: "unused",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: ['ManageMessages'],
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
        // let image = new AttachmentBuilder("src/assets/guidelines.png")
        const embed = new EmbedBuilder()
                .setDescription(`a`)
                .setColor('2b2d31')
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel("Support (Ko-Fi)")
                .setStyle(ButtonStyle.Link)
                .setURL(`https://ko-fi.com/axxae`)
            )
        
        await message.channel.send({ embeds: [embed], components: [button] })
    }
})

