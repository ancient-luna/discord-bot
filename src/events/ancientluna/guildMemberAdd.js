const { AttachmentBuilder, ContainerBuilder, TextDisplayBuilder, MediaGalleryBuilder, SectionBuilder, MessageFlags, ButtonBuilder } = require("discord.js");
const canvafy = require('canvafy');
const util = require('../../utils/index');

module.exports = new Object({
    name: "guildMemberAdd",
    
    async execute(client, member) {
        // if (member.user.bot) return;
        const role = member.guild.roles.cache.get(client.config.luxcastaRole);
        if (!role) return;
        await member.roles.add(role).catch((err) => util.printLog('error', err));
        const baseUsername = member.user.username;
        const memberUsername = baseUsername.length > 20 ? baseUsername.slice(0, 17) + '...' : baseUsername;
        const channel = member.guild.channels.cache.get(client.config.gatewayChannel);
        const card = await new canvafy.WelcomeLeave()
            .setAvatar(member.user.displayAvatarURL({ size: 4096 }))
            .setAvatarBorder('#82AADC')
            .setTitle(memberUsername,'#82AADC')
            .setDescription('we ran as if to meet the moon')
            .setBackground('image','https://ik.imagekit.io/al/welcomemsg.png')
            .build();
        const cardBuffer = Buffer.from(card);
        const attachment = new AttachmentBuilder(cardBuffer, { name: `${member.user.id}.png` });
        const container = new ContainerBuilder()
        const textMention = new TextDisplayBuilder().setContent(`-# <:ico_join:1374730865430495232> <@${member.user.id}> visits the sanctuary`);
        const textHeader = new TextDisplayBuilder().setContent(`# Welcome to [${member.guild.name}](https://discord.gg/Sbp2nt8QHe)`);
        const textDescription = new TextDisplayBuilder().setContent(`-# Understand our **wisdom of lleud** at ${member.guild.channels.cache.get(client.config.ruleChannel).toString()} as you make your way through this warm sanctuary`);
        const mediaGallery = new MediaGalleryBuilder()
            .addItems([{
                type: 'image',
                media: {
                    url: `attachment://${member.user.id}.png`
                } 
            }]);
        const wisdomButton = new ButtonBuilder()
            .setLabel('Wisdom of Lleud')
            .setStyle('Link')
            .setEmoji('<:al_wisdom:1334851144572211240>')
            .setURL('https://discord.com/channels/447069790150852609/838751745815216129');
        const section = new SectionBuilder()
            .addTextDisplayComponents(textHeader)
            .setButtonAccessory(wisdomButton)
        container.addTextDisplayComponents(textMention);
        container.addSectionComponents(section);
        container.addMediaGalleryComponents(mediaGallery);
        container.addTextDisplayComponents(textDescription);
        return channel.send({
            flags: MessageFlags.IsComponentsV2,
            components: [container],
            files: [attachment],
            allowedMentions: { users: [member.id] }
        });
    }
});