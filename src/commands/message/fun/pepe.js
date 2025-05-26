const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require("canvas");

module.exports = new Object({
    name: "pepe",
    description: "el pepe sign",
    category: "fun",
    usage: `${client.prefix}pepe [text]`,
    cooldown: 0,
    aliases: [],
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
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {

        const canvas = Canvas.createCanvas(200, 200);
        const ctx = canvas.getContext("2d");
        try {
            const blankSign = await Canvas.loadImage('src/assets/react/pepesign.png');
            const signText = args.slice(0).join(' ').trim() || `${message.author.displayName} noob`;
      
            const maxLineWidth = 60;
            let lines = [];
            let currentLine = '';
            const words = signText.split(' ');
            for (const word of words) {
              const testLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
              const testWidth = ctx.measureText(signText).width;
              if (testWidth > maxLineWidth) {
                lines.push(currentLine);
                currentLine = word;
              } else {
                currentLine = testLine;
              }
            }
            lines.push(currentLine);
      
            const lineHeight = 30;
            const totalHeight = lines.length * lineHeight;
            const startY = (canvas.height - totalHeight) / 4;
      
            ctx.drawImage(blankSign, 0, 0, canvas.width, canvas.height);
            ctx.font = '30px Arial';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            lines.forEach((line, index) => {
              const y = startY + index * lineHeight;
              ctx.fillText(line, canvas.width / 2, y);
            });
      
            const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'pepesign.png' });
      
            await message.channel.send({
                content: '_ _',
                files: [attachment]
            })
          } catch (error) {
            console.error('Failed to edit reply:', error);
            await message.channel.send({
                content: '_ _',
                files: [attachment]
            })
          }
    }
});