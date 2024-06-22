const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { createCanvas, loadImage } = require('canvas');

module.exports = {
    name: "radiance",
    description: "radiance.",
    category: "Entertainment",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },

    /**
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {

        const loadingTxt = await message.channel.send(`Listing the **Supporters** and the **Boosters** <a:_util_loading:863317596551118858>`);

        const roleIds = [
            '620709364247822338', // luminance role
            '888736428069105674' // radiance role
        ];

        const allMembers = { luminance: [], radiance: [] };

        for (const roleId of roleIds) {
            const role = message.guild.roles.cache.get(roleId);
            if (role) {
                const members = role.members.map(member => member).sort((a, b) => a.displayName.localeCompare(b.displayName));
                if (roleId === '620709364247822338') {
                    allMembers.luminance.push(...members);
                } else if (roleId === '888736428069105674') {
                    allMembers.radiance.push(...members);
                }
            }
        }

        if (allMembers.luminance.length === 0 && allMembers.radiance.length === 0) {
            return loadingTxt.edit("Roles not found or no members in roles.");
        }

        const avatarUrls = [...allMembers.luminance, ...allMembers.radiance].map(member => member.user.displayAvatarURL({ extension: 'png', size: 128 }));
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
        
        const embed = new EmbedBuilder()
            .setTitle('Thank you!')
            .setDescription(`To <#1171703846918168577> <#839417252561944586>,\nthis growth of my will to rise this community wouldn't be possible without your support.\n⁣\`\`\`𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐄𝐑𝐒 (𝐑𝐀𝐃𝐈𝐀𝐍𝐂𝐄) ✦\`\`\`\n> ${radianceMentions}\n⁣\`\`\`𝐁𝐎𝐎𝐒𝐓𝐄𝐑𝐒 (𝐋𝐔𝐌𝐈𝐍𝐀𝐍𝐂𝐄) ♡\`\`\`\n> ${luminanceMentions}`)
            .setImage('attachment://radiance.png')
            .setColor(client.config.embedColorTrans)
            .setFooter({ text: `A frame of honor people #달을만났다` })
            .setTimestamp();

        loadingTxt.edit({
            content: '⁣',
            embeds: [embed],
            files: [radiance]
        });
    }
};