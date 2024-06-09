const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
const { createCanvas, loadImage } = require('canvas');
module.exports = new Object({
    name: "acvunused",
    description: "unused.",
    category: "unused",
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
        // Create a canvas and get its context
        let welcomeCanvas = createCanvas(1024, 500);
        let context = welcomeCanvas.getContext('2d');

        // Set font and color
        context.font = '72px sans-serif';
        context.fillStyle = '#ffffff';

        // Load the background image and draw it on the canvas
        loadImage('https://i.pinimg.com/736x/8c/49/83/8c4983c6560031f4120bcba35945e6c0.jpg').then(async (img) => {
            context.drawImage(img, 0, 0, 1024, 500);

            // Add welcome text
            context.fillText('', 360, 360);

            // Draw a circle
            context.beginPath();
            context.arc(512, 166, 128, 0, Math.PI * 2, true);
            context.stroke();
            context.fill();

            // Set smaller font and alignment
            context.font = '42px sans-serif';
            context.textAlign = 'center';

            // Add the username text
            context.fillText(message.author.displayName.toUpperCase(), 512, 410);

            // Add the member count text
            context.font = '32px sans-serif';
            context.fillText(`You are the ${message.member.guild.memberCount}th`, 512, 455);

            // Create a clipping region and draw the avatar
            context.beginPath();
            context.arc(512, 166, 119, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();

            // Load the user's avatar and draw it
            let avatarURL = message.member.user.displayAvatarURL({ extension: 'png', dynamic: true, size: 1024 });
            loadImage(avatarURL).then((avatarImg) => {
                context.drawImage(avatarImg, 393, 47, 238, 238);

                // Create an attachment
                const attachment = new AttachmentBuilder(welcomeCanvas.toBuffer(), { name: `welcome-${message.author.id}.png` });

                // Create an embed
                const embed = new EmbedBuilder()
                    .setImage(`attachment://welcome-${message.author.id}.png`);

                // Send the message with the embed and attachment
                message.channel.send({
                    embeds: [embed],
                    files: [attachment]
                });
            });
        });
    }
});