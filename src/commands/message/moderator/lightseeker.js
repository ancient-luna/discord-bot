const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = new Object({
    name: "lightseeker",
    description: "giving lightseeker role to mentioned member",
    category: "moderator",
    usage: `lightseeker <@user>`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: {
        client: ['ManageGuild'],
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
        const lunariaID = '839170815932891197';
        if (!message.member.roles.cache.has(lunariaID)) {
            return message.reply(`**No, you can't**. only the **LUNARIA** able to command me for this.`);
        }
        let target = message.mentions.members.first();
        if (!target) return message.reply('please `mention a user`');
        let lightseekerRole = '839198215580811344';
        let luxcastaRole = '839210689917616218';
        const welcomeButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Get Roles")
                    .setURL("https://discord.com/channels/447069790150852609/864556584818835456"),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Get Guild Tag")
                    .setURL("https://discord.gg/XJCtfTPBfu"),
                new ButtonBuilder()
                    .setCustomId("btn-fellowcard")
                    .setLabel("Signature")
                    .setStyle(ButtonStyle.Primary)
            )
        message.guild.channels.cache.get('452842830776369152').send({
            content: `**Welcome <@${target.user.id}>, to the sanctuary of light**. The <@&843523544620335124> welcome you as one of true light seekers\n-# <:al_wisdom:1334851144572211240> ${target.user.displayName} has passed the trial by understand our wisdom of lleud to reach this warm sanctuary deeper`,
            components: [welcomeButton]
        });
        await target.roles.remove(luxcastaRole);
        await target.roles.add(lightseekerRole);
        await message.delete().catch((e) => { });
    }
});