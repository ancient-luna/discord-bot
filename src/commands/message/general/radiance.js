const { EmbedBuilder, AttachmentBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags, SeparatorBuilder, SeparatorSpacingSize, MediaGalleryBuilder, FileBuilder, ButtonBuilder, SectionBuilder } = require("discord.js");
const { createCanvas, loadImage } = require('canvas');

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
        const loadingFail = new TextDisplayBuilder().setContent(`this command may stay only in [**AncientLuna**](https://discord.gg/Sbp2nt8QHe)`)

        let loadingTxt = await message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [loadingText] })

        const roleIds = [
            client.config.luminanceRole, // luminance role
            client.config.radianceRole // radiance role
        ];

        const allMembers = { luminance: [], radiance: [] };

        for (const roleId of roleIds) {
            const role = message.guild.roles.cache.get(roleId);
            if (role) {
                const members = role.members.map(member => member).sort((a, b) => a.displayName.localeCompare(b.displayName));
                if (roleId === client.config.luminanceRole) {
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

        // Load all images in parallel
        const images = await Promise.all(avatarUrls.map(url => loadImage(url)));

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

        const container = new ContainerBuilder();
        const textHeader = new TextDisplayBuilder().setContent('# Gratitude from the Ancients')
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large })
        const textContent = new TextDisplayBuilder().setContent(`From the first breath of moonlight, a vow was made — and a sanctuary was born. What began as my spark now grows in your glow. Ancient Luna rises, not by my will alone, but through the quiet radiance you carry.`);
        const textRadiance = new TextDisplayBuilder().setContent('### <:ancientluna_divinare:841754250949820416> <@&888736428069105674>\n-# *Guided by the Radiance: those who keep our light enduring*')
        const textRadianceMentions = new TextDisplayBuilder().setContent(radianceMentions)
        const textLuminance = new TextDisplayBuilder().setContent('### <:ancientluna_divinare_s:859034096192978965> <@&620709364247822338>\n-# *Honoring the Luminance: our sanctuary’s uplifted souls*')
        const textLuminanceMentions = new TextDisplayBuilder().setContent(luminanceMentions)

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
                    // url: 'https://i.imgur.com/nnF1JRE.png'
                    url: 'https://i.imgur.com/nLQReck.png'
                } 
            }]);

        const supportButton = new ButtonBuilder()
            .setLabel('Testaments of the Seekers')
            .setStyle('Link')
            .setURL('https://discord.com/channels/447069790150852609/1171703846918168577');

        const sectionHeader = new SectionBuilder()
            .addTextDisplayComponents(textHeader)
            .setButtonAccessory(supportButton)

        container.addMediaGalleryComponents(mediaSeeker)
        container.addSectionComponents(sectionHeader)
        container.addTextDisplayComponents(textContent)
        container.addSeparatorComponents(separator)
        container.addTextDisplayComponents(textRadiance)
        container.addTextDisplayComponents(textRadianceMentions)
        container.addSeparatorComponents(separator);
        container.addTextDisplayComponents(textLuminance)
        container.addTextDisplayComponents(textLuminanceMentions)
        container.addMediaGalleryComponents(mediaSign);

        await loadingTxt.edit({
            flags: MessageFlags.IsComponentsV2,
            components: [container],
            files: [radiance],
            allowedMentions: { parse: [] },
        });
    }
};