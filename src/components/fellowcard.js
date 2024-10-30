const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "fellowcard",
  id: "btn-fellowcard",
  permissions: {
    client: [],
    user: [],
    dev: false,
  },
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  execute: async (client, interaction) => {
    // Canvas and context setup
    const canvas = createCanvas(500, 800);
    const ctx = canvas.getContext("2d");

    // Load fonts
    registerFont('src/assets/usercard/PearlAbyss.ttf', { family: 'PearlAbyss' });
    registerFont('src/assets/usercard/HelveticaBold.ttf', { family: 'HelveticaBold' });

    // Define rounded rectangle function
    function roundRect(ctx, x, y, width, height, radius = 5, fill = true, stroke = true) {
        if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
        radius = { tl: 0, tr: 0, br: 0, bl: 0, ...radius };
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    }

    // Load the background image and proceed with drawing
    fs.readFile('src/assets/usercard/signature.png', (err, data) => {
        if (err) throw new Error('Failed to read image file.');

        loadImage(data).then((image) => {
        ctx.drawImage(image, 0, 0, 500, 800);

        // Text settings and adjustments for display name
        let nameSize = 40;
        const padding = 15;
        const displayName = interaction.member.displayName.toUpperCase();
        while (ctx.measureText(displayName).width > 500 - 2 * padding && nameSize > 10) {
            ctx.font = `${(nameSize -= 2)}px "PearlAbyss"`;
        }
        ctx.fillStyle = "#00cdff";
        ctx.textAlign = "center";
        ctx.fillText(displayName, 250, 87);

        // Load avatar and draw it on canvas
        return loadImage(interaction.member.displayAvatarURL({ extension: "png", dynamic: true, size: 512 }));
        }).then((avatar) => {
        const avatarCanvas = createCanvas(310, 310);
        const avatarCtx = avatarCanvas.getContext('2d');
        avatarCtx.beginPath();
        avatarCtx.arc(155, 155, 150, 0, Math.PI * 2);
        avatarCtx.clip();
        avatarCtx.drawImage(avatar, 0, 0, 310, 310);
        ctx.drawImage(avatarCanvas, 100, 139);

        // Role display setup
        const limitRoles = ['590848319111299093', '839170815932891197', '620709364247822338', '888736428069105674', '839198215580811344'];
        const sortedRoles = interaction.member.roles.cache
            .filter(role => limitRoles.includes(role.id) && role.name !== '@everyone')
            .sort((a, b) => b.position - a.position);

        let beginY = 655;
        const spaceX = 10;

        if (sortedRoles.size === 0) {
            ctx.fillStyle = "#6b7b88";
            ctx.font = '20pt HelveticaBold';
            ctx.fillText('달을 만났다', 250, beginY);
        } else {
            ctx.font = '16pt HelveticaBold';
            let rowX = 250 - (ctx.measureText(sortedRoles.map(role => role.name.toUpperCase()).join(' ') + spaceX).width / 2);

            sortedRoles.forEach((role) => {
            const roleName = role.name.toUpperCase();
            const roleWidth = ctx.measureText(roleName).width + padding * 2;
            const roleColor = role.color.toString(16).padStart(6, '0');
            ctx.fillStyle = "#0c202e";
            roundRect(ctx, rowX, beginY - 26, roleWidth, 40, 22, true, false);
            ctx.fillStyle = `#${roleColor}`;
            ctx.fillText(roleName, rowX + padding, beginY);
            rowX += roleWidth + spaceX;
            });
        }

        // Send image as attachment
        const sfBuffer = canvas.toBuffer();
        interaction.reply({
            content: '_ _',
            files: [{ attachment: sfBuffer, name: 'fellowcard.png' }],
            ephemeral: true
        });
        }).catch((error) => {
        console.error('Error:', error);
        interaction.reply({ content: 'An error occurred while creating the fellowcard. Please try again later.', ephemeral: true });
        });
    });
  },
};