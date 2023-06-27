
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = new Object({
    name: "embed",
    description: "embed.",
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

        const btnVac = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("btn-guildvacation")
            .setLabel("Apply for Vacation")
            .setStyle(ButtonStyle.Danger)
        );

        const embed = new EmbedBuilder()
            .setDescription("Need to take a break from the game? **Get a vacation now!**")
            .setColor("2b2d31")

        await message.channel.send({
            embeds: [embed],
            components: [btnVac]
        }).catch(e => { });
    }
})
