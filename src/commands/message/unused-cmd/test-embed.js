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
        let image = new AttachmentBuilder("src/assets/guidelines.png")
        const embed = new EmbedBuilder()
                .setDescription(`a`)
                .setColor('2b2d31')
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel("Give Suggestion")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("btn-suggestion")
            )
            .addComponents(
                new ButtonBuilder()
                .setLabel("Open Ticket")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("btn-ticketopen")
            )
            .addComponents(
                new ButtonBuilder()
                .setLabel("Confession")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("<:icons_edit:1163375500392153119>")
                .setCustomId("btn-confession")
            )
        
        await message.channel.send({ embeds: [embed], components: [button], files: [image] })
    }
})

