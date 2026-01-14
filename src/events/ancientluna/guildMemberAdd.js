const { AttachmentBuilder, ContainerBuilder, TextDisplayBuilder, MediaGalleryBuilder, SectionBuilder, MessageFlags, ButtonBuilder, ActionRowBuilder, ButtonStyle, SeparatorBuilder, SeparatorSpacingSize } = require("discord.js");
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

module.exports = new Object({
    name: "guildMemberAdd",

    async execute(client, member) {
        // if (member.user.bot) return;
        // const role = member.guild.roles.cache.get(client.config.luxcastaRole);
        // if (!role) return;
        // await member.roles.add(role).catch((err) => util.printLog('error', err));

        const baseUsername = member.user.username;
        const memberUsername = baseUsername.length > 20 ? baseUsername.slice(0, 17) + '...' : baseUsername;
        const channel = member.guild.channels.cache.get(client.config.gatewayChannel);

        registerFont(path.join(__dirname, '../../assets/fonts/Bestie Seventy.ttf'), { family: 'Bestie Seventy' });
        registerFont(path.join(__dirname, '../../assets/fonts/Passport Regular.ttf'), { family: 'Passport Regular' });
        const background = await loadImage(path.join(__dirname, '../../assets/lunawisdom.png'));

        const canvas = createCanvas(background.width, background.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const avatar = await loadImage(member.user.displayAvatarURL({ extension: 'png', size: 1024 }));

        const avatarSize = 140;
        const avatarX = (canvas.width - avatarSize) / 2;
        const avatarY = 40;

        ctx.save();
        ctx.beginPath();
        ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
        ctx.restore();

        ctx.font = '80px "Bestie Seventy"';
        ctx.fillStyle = '#99c4ee';
        ctx.textAlign = 'center';
        ctx.fillText(memberUsername, canvas.width / 2, avatarY + avatarSize + 60);

        ctx.font = '15px "Passport Regular"';
        ctx.fillStyle = '#051826';
        ctx.textAlign = 'right';
        ctx.fillText(member.user.id, canvas.width - 20, 30);

        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: `${member.user.id}.png` });
        const container = new ContainerBuilder()
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large })
        const textMention = new TextDisplayBuilder().setContent(`-# <:ico_join:1374730865430495232> <@${member.user.id}> visits the sanctuary`);
        const textHeader = new TextDisplayBuilder().setContent(`# 𝖂𝖊𝖑𝖈𝖔𝖒𝖊 𝖙𝖔 [${member.guild.name}](https://discord.gg/MktSB4Kxgz)`);
        const textDescription = new TextDisplayBuilder().setContent(`-# Understand our **wisdom of lleud** at ${member.guild.channels.cache.get(client.config.guidelineChannel)?.toString() || 'the guidelines channel'} as you make your way through this warm sanctuary`);
        const mediaGallery = new MediaGalleryBuilder()
            .addItems([{
                type: 'image',
                media: {
                    url: `attachment://${member.user.id}.png`
                }
            }]);
        const wisdomButton = new ButtonBuilder()
            .setLabel('We ran as if to meet the moon')
            .setStyle('Link')
            .setEmoji('<:al_levatio:1376685304005525585>')
            .setURL('https://discord.com/channels/1457941632052756634/1459865586807869533');

        const section = new SectionBuilder()
            .addTextDisplayComponents(textHeader)
            .setButtonAccessory(wisdomButton)

        container.addSectionComponents(section);
        container.addSeparatorComponents(separator);
        container.addMediaGalleryComponents(mediaGallery);
        container.addTextDisplayComponents(textDescription);

        return channel.send({
            flags: MessageFlags.IsComponentsV2,
            components: [textMention, container],
            files: [attachment],
            allowedMentions: { users: [member.id] }
        });
    }
});