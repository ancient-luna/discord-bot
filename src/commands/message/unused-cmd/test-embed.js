const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "embeds",
    description: "embeds.",
    category: "Blackdesert",
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
                .setAuthor({ name: "confession" })
                .setDescription(`**Just wondering if you've any thoughts, suggestions or feedbacks?**\nIf you have feedback on this community, we would love to hear it. Your kind words are valuable to the Elders and Light Seekers here.`)
                .setColor('2b2d31')
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("btn-suggestion")
                .setLabel("Give Suggestion")
                .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                .setCustomId("btn-ticketopen")
                .setLabel("Open Ticket")
                .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                .setCustomId("btn-confession")
                .setLabel("Confession")
                .setStyle(ButtonStyle.Primary)
            )
        
        await message.channel.send({ embeds: [embed], components: [button], files: [image]})
    }
})

