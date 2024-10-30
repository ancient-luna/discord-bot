const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = new Object({
    name: "lightseeker",
    description: "lightseeker.",
    category: "Moderator",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: ['ManageGuild'],
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
        let target = message.mentions.members.first();
        if (!target) return message.reply('please `mention a user`');
        let lightseekerRole = '839198215580811344';
        let luxcastaRole = '839210689917616218';
        const welcomeButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Get more roles here")
                    .setURL("https://discord.com/channels/447069790150852609/864556584818835456")
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("btn-fellowcard")
                    .setLabel("Your fellowcard")
                    .setStyle(ButtonStyle.Primary)
            )
        message.guild.channels.cache.get('452842830776369152').send({
            content: `Welcome <@${target.user.id}>, to **the sanctuary of light**. The <@&843523544620335124> welcome you as one of true light seekers <:ancientluna_pure_luna:866781517312688178>\n-# ${target.user.displayName} has passed the trial by understand our wisdom of lleud to reach this warm sanctuary deeper`,
            components: [welcomeButton]
        });
        await target.roles.remove(luxcastaRole);
        await target.roles.add(lightseekerRole);
        await message.delete().catch((e) => { });
    }
});