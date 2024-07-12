const fs = require("fs");
const { createCanvas, loadImage, registerFont } = require("canvas");

module.exports = {
  name: "fellowcard",
  description: "fellowcard.",
  category: "Usercard",
  usage: "",
  cooldown: 0,
  aliases: [''],
  examples: [''],
  sub_commands: [],
  args: false,
  permissions: {
    client: [],
    user: [],
    dev: false,
  },
  player: { voice: false, active: false, dj: false },
  /**
   * 
   * @param {import("../../../index")} client 
   * @param {import("discord.js").Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    let loadingTxt = await message.channel.send(`generating your own unique card <a:_util_loading:863317596551118858>`);

    const canvas = createCanvas(500, 800);
    const ctx = canvas.getContext("2d");

    registerFont('src/assets/usercard/PearlAbyss.ttf', { family: 'PearlAbyss' });
    registerFont('src/assets/usercard/HelveticaBold.ttf', { family: 'HelveticaBold' });

    function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
      if (typeof stroke === 'undefined') {
        stroke = true;
      }
      if (typeof radius === 'undefined') {
        radius = 5;
      }
      if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
      } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
          radius[side] = radius[side] || defaultRadius[side];
        }
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
      if (fill) {
        ctx.fill();
      }
      if (stroke) {
        ctx.stroke();
      }
    }

    fs.readFile('src/assets/usercard/signature.png', async (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return message.reply('Failed to read image file.');
      }

      try {
        const image = await loadImage(data);
        ctx.drawImage(image, 0, 0, 500, 800);

        let nameSize = 40;
        let fontSize = 33;
        let beginY = 95;
        let beginX = 250;
        let spaceX = 10;
        let endX = 480;
        let padding = 15;

        // Generate name text
        let displayName = message.member.displayName.toUpperCase();
        let nameFits = false;

        // Continuously check if the name fits within the canvas width
        while (!nameFits && nameSize > 10) {
          ctx.font = `${nameSize}px "PearlAbyss"`;
          let nameWidth = ctx.measureText(displayName).width;
          if (nameWidth <= 500 - 2 * padding) {
            nameFits = true;
          } else {
            nameSize -= 2;
          }
        }

        ctx.textAlign = "center";
        ctx.fillStyle = "#00cdff";
        ctx.fillText(message.member.displayName, 250, 87);

        const avatar = await loadImage(message.member.displayAvatarURL({ extension: "png", dynamic: true, size: 512 }));
        let avatarX = 310;
        let avatarY = 310;
        let avatarCanvas = createCanvas(avatarX, avatarY);
        let avatarCtx = avatarCanvas.getContext('2d');
        avatarCtx.beginPath();
        avatarCtx.arc(avatarX / 2, avatarY / 2, 150, 0, Math.PI * 2, true);
        let grd = ctx.createLinearGradient(150.000, 300.000, 150.000, 0.000);
        grd.addColorStop(0.450, '#00cdff');
        grd.addColorStop(1.000, 'rgba(255, 255, 255, 0.000)');
        ctx.fillStyle = grd;
        avatarCtx.lineWidth = 11;
        avatarCtx.strokeStyle = grd;
        avatarCtx.stroke();
        avatarCtx.closePath();
        avatarCtx.clip();
        avatarCtx.drawImage(avatar, 0, 0, avatarX, avatarY);
        ctx.drawImage(avatarCanvas, 100, 139);

        // Generate role texts
        const limitRoles = [
          '590848319111299093', // ancestorID
          '839170815932891197', // lunariaID
          '620709364247822338', // luminanceID
          '888736428069105674', // radianceID
          '839198215580811344', // lightseekerID
          // '1148832046505009193', // etendueID
          // '1060982357538119850', // discipleID
          // '1052973235710464040' // levatioID
        ];

        // Sort roles alphabetically
        const sortedRoles = message.member.roles.cache
          .filter(role => limitRoles.includes(role.id) && role.name !== '@everyone')
          // .sort((a, b) => a.name.localeCompare(b.name));
          .sort((a, b) => b.position - a.position);

        // Check if sortedRoles is empty and set context to 'Ancient Luna'
        if (sortedRoles.size === 0) {
          ctx.textAlign = "center";
          ctx.fillStyle = "#6b7b88";
          ctx.font = '20pt HelveticaBold';
          ctx.fillText('달을 만났다', 250, 665);
        } else {
          beginY += 560;
          let rows = [{ row: 1, roles: [], width: 0 }];
          ctx.font = '16pt HelveticaBold';
          let length = 0;

          sortedRoles.forEach((role, index) => {
            length += ctx.measureText(role.name.toUpperCase()).width + (padding * 2);
            if (length >= 480 - (padding * 2)) {
              length = ctx.measureText(role.name.toUpperCase()).width + (padding * 2);
              rows.push({ row: rows[rows.length - 1].row + 1, roles: [index], width: length });
            } else {
              length += spaceX;
              if (!rows[rows.length - 1].roles.includes(role.id)) rows[rows.length - 1].roles.push(role.id);
              rows[rows.length - 1].width = length;
            }
          });

          ctx.textAlign = "left";
          rows.forEach(row => {
            beginX = 250 - ((row.width / 2))
            row.roles.forEach((r, index) => {
              let role = message.member.roles.cache.find(i => i.id === r)
              let roleColor = role.color.toString(16).padStart(6, '0')
              if (role) {
                let length = ctx.measureText(role.name.toUpperCase()).width;
                if (endX > beginX) {
                  ctx.fillStyle = "#0c202e";
                  roundRect(ctx, beginX, beginY - 26, length + (padding * 2), parseInt(fontSize) + 7, 22, true, false);
                  ctx.fillStyle = `#${roleColor}`
                  ctx.fillText(role.name.toUpperCase(), beginX + padding, beginY);
                }
                beginX += length + spaceX + (padding * 2);
              }
            })
            beginY += 55
          })
        }

        const sfBuffer = canvas.toBuffer();
        await loadingTxt.edit({
          content: '_ _',
          files: [
            {
              attachment: sfBuffer,
              name: 'fellowcard.png'
            }
          ]
        }).then((msg) => { msg.react('ancientluna_divinare:841754250949820416') });
      } catch (error) {
        console.error('Error:', error);
        await loadingTxt.edit('Failed to create test card. **Please try again later**');
      }
    });
  }
};
