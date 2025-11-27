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
    
    async execute(client, message, args) {
        if (!message.member.roles.cache.has(client.config.lunariaRole)) {
            return message.reply(`**No, you can't**. only the **LUNARIA** able to command me for this.`);
        }
        let target = message.mentions.members.first();
        if (!target) return message.reply('please `mention a user`');
        const welcomeButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Get more roles here")
                    .setURL("https://discord.com/channels/447069790150852609/864556584818835456"),
                new ButtonBuilder()
                    .setCustomId("btn-fellowcard")
                    .setLabel("Signature")
                    .setStyle(ButtonStyle.Primary)
            )
        message.guild.channels.cache.get(client.config.generalChannel).send({
            content: `**Welcome <@${target.user.id}>, to the sanctuary of light**. The <@&843523544620335124> welcome you as one of true light seekers\n-# <:al_wisdom:1334851144572211240> ${target.user.displayName} has passed the trial by understand our wisdom of lleud to reach this warm sanctuary deeper`,
            components: [welcomeButton]
        });
        await target.roles.remove(client.config.luxcastaRole);
        await target.roles.add(client.config.memberRole);
        await message.delete().catch((e) => { });
    }
});