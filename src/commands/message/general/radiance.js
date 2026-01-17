const { EmbedBuilder, AttachmentBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags, SeparatorBuilder, SeparatorSpacingSize, MediaGalleryBuilder, FileBuilder, ButtonBuilder, SectionBuilder } = require("discord.js");
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

module.exports = {
    name: "radiance",
    description: "current supporters and booster in the sanctuary",
    category: "general",
    usage: `radiance`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: { client: [], user: [], dev: false, },
    player: { voice: false, active: false, dj: false, },

    async execute(client, message, args) {
        await message.delete().catch((e) => { });

        const loadingText = new TextDisplayBuilder().setContent(`Listing the **Supporters** and the **Boosters** <a:u_load:1334900265953923085>`)
        const loadingFail = new TextDisplayBuilder().setContent(`This command may stay only in [**AncientLuna**](https://discord.gg/MktSB4Kxgz)`)

        let loadingTxt = await message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [loadingText] })

        const roleIds = [
            client.config.lunaBoosterRole, // luminance role
            client.config.radianceRole // radiance role
        ];

        const allMembers = { luminance: [], radiance: [] };

        for (const roleId of roleIds) {
            const role = message.guild.roles.cache.get(roleId);
            if (role) {
                const members = role.members.map(member => member).sort((a, b) => a.displayName.localeCompare(b.displayName));
                if (roleId === client.config.lunaBoosterRole) {
                    allMembers.luminance.push(...members);
                } else if (roleId === client.config.radianceRole) {
                    allMembers.radiance.push(...members);
                }
            }
        }

        if (allMembers.luminance.length === 0 && allMembers.radiance.length === 0) {
            return await loadingTxt.edit({ flags: MessageFlags.IsComponentsV2, components: [loadingFail] });
        }

        const avatarUrls = [...allMembers.luminance, ...allMembers.radiance].map(member => member.displayAvatarURL({ extension: 'png', size: 128 }));
        const luminanceMentions = allMembers.luminance.map(member => `<@${member.id}>`).join(' ') || 'No members';
        const radianceMentions = allMembers.radiance.map(member => `<@${member.id}>`).join(' ') || 'No members';

        const canvas = createCanvas(1730, 441);
        const ctx = canvas.getContext('2d');

        const cols = 15;
        const rows = 5;
        const size = 150;
        const margin = 10;
        const radius = 16;

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#0f1114');
        gradient.addColorStop(1, '#22272e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const images = await Promise.all(avatarUrls.map(url => loadImage(url)));
        images.sort(() => Math.random() - 0.5);

        let index = 0;
        for (let row = -1; row < rows; row++) {
            for (let col = -1; col < cols; col++) {
                if (index >= images.length) {
                    index = 0;
                }
                const x = col * (size + margin);
                const y = row * (size + margin);

                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const angle = Math.PI / 180 * 10;
                const rotatedX = Math.cos(angle) * (x - centerX) - Math.sin(angle) * (y - centerY) + centerX;
                const rotatedY = Math.sin(angle) * (x - centerX) + Math.cos(angle) * (y - centerY) + centerY;

                ctx.save();
                ctx.translate(rotatedX, rotatedY);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(-size / 2 + radius, -size / 2);
                ctx.arcTo(size / 2, -size / 2, size / 2, size / 2, radius);
                ctx.arcTo(size / 2, size / 2, -size / 2, size / 2, radius);
                ctx.arcTo(-size / 2, size / 2, -size / 2, -size / 2, radius);
                ctx.arcTo(-size / 2, -size / 2, size / 2, -size / 2, radius);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(images[index], -size / 2, -size / 2, size, size);

                ctx.restore();
                index++;
            }
        }

        const radiance = new AttachmentBuilder(canvas.toBuffer(), { name: 'radiance.png' });

        const luminanceEmoji = '<:lumi_1:1461957807749468190><:lumi_2:1461957809573986367><:lumi_3:1461957812006424781><:lumi_4:1461957814787510481><:lumi_5:1461957816939184160>';

        const container = new ContainerBuilder();
        const textHeader = new TextDisplayBuilder().setContent('# 𝕲𝖗𝖆𝖙𝖎𝖙𝖚𝖉𝖊 𝖋𝖗𝖔𝖒 𝖙𝖍𝖊 𝕬𝖓𝖈𝖎𝖊𝖓𝖙𝖘');
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large });
        const textContent = new TextDisplayBuilder().setContent(`-# By the first breath of moonlight, a vow was sealed, and a sanctuary took form. Now we gather once more, as what was begun stirs again, rising not by His will alone, but through the quiet luminance you carry`);
        // const textRadiance = new TextDisplayBuilder().setContent(`### <:ico_radiance:1334864373331787827> <@&${client.config.radianceRole}>\n-# *Guided by the Radiance: those who keep our light enduring*`);
        // const textRadianceMentions = new TextDisplayBuilder().setContent(radianceMentions);
        const textLuminance = new TextDisplayBuilder().setContent(`-# *Honoring the ${luminanceEmoji} our sanctuary's uplifted souls*`);
        const textLuminanceMentions = new TextDisplayBuilder().setContent(luminanceMentions);
        const textTimeUpdate = new TextDisplayBuilder().setContent(`-# <:ic_repost:1334863701026541648> *Updates every day at 00:00 (UTC+7)*`);

        const mediaSeeker = new MediaGalleryBuilder()
            .addItems([{
                type: 'image',
                media: {
                    url: 'attachment://radiance.png'
                }
            }]);

        const mediaSign = new MediaGalleryBuilder()
            .addItems([{
                type: 'image',
                media: {
                    url: 'https://i.imgur.com/nLQReck.png'
                }
            }]);

        const supportButton = new ButtonBuilder()
            .setLabel('Testaments of the Seekers')
            .setStyle('Link')
            .setEmoji('<:ico_owner:1369186022558269561>')
            .setURL('https://discord.com/channels/1457941632052756634/1459865586807869533');

        const sectionHeader = new SectionBuilder()
            .addTextDisplayComponents(textHeader)
            .setButtonAccessory(supportButton)

        container.addSectionComponents(sectionHeader)
        container.addTextDisplayComponents(textContent)
        container.addMediaGalleryComponents(mediaSeeker)
        // container.addSeparatorComponents(separator)
        // container.addTextDisplayComponents(textRadiance)
        // container.addTextDisplayComponents(textRadianceMentions)
        // container.addSeparatorComponents(separator);
        container.addTextDisplayComponents(textLuminance)
        container.addTextDisplayComponents(textLuminanceMentions)
        container.addMediaGalleryComponents(mediaSign);
        container.addTextDisplayComponents(textTimeUpdate);

        await loadingTxt.edit({
            flags: MessageFlags.IsComponentsV2,
            components: [container],
            files: [radiance],
            allowedMentions: { parse: [] },
        });
    }
};