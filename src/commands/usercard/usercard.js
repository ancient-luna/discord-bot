const fs = require("fs");
const { createCanvas, loadImage, registerFont } = require("canvas")
const { MessageAttachment } = require("discord.js")
registerFont('src/assets/usercard/PaybAck.ttf', { family: 'PaybAck' })
registerFont('src/assets/usercard/FRAHV.TTF', { family: 'FRAHV' })

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
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

module.exports.run = async (client, message, args, config) => {
  const canvas = createCanvas(500, 800);
  const ctx = canvas.getContext("2d");

  // const ancestorID = '590848319111299093';
  // const lunariaID = '839170815932891197';
  // const lightseekerID = '839198215580811344';
  // const luminanceID = '620709364247822338';
  // const etendueID = '888736428069105674';
  // const discipleID = '1060982357538119850';
  // const levatioID = '1052973235710464040';

  // const limitRoles = [
  //   ancestorID,
  //   lunariaID,
  //   lightseekerID,
  //   luminanceID,
  //   etendueID,
  //   discipleID,
  //   levatioID
  // ]

  fs.readFile('src/assets/usercard/templatekr.png', (err, data) => {
    if(err) throw err;

    let fontSize = 33;
    let beginY = 95;
    let beginX = 250;
    let spaceX = 10;
    let endX = 480;
    let padding = 15;

    loadImage(data).then(async (image) => {
      ctx.drawImage(image, 0, 0, 500, 800)


      // Generate name text
      let nameLength = ctx.measureText(message.member.displayName.toUpperCase()).width;
      if(nameLength > 800-beginX){
        fontSize -= 2;
        nameLength = ctx.measureText(message.member.displayName.toUpperCase()).width;
        if(nameLength > 800-beginX){
          fontSize -=3;
          nameLength = ctx.measureText(message.member.displayName.toUpperCase()).width;
          if(nameLength > 800-beginX){
            fontSize -=2;
          }
        }
      }
      ctx.font = `${fontSize}px "PaybAck"`
      ctx.textAlign = "center"
      ctx.fillStyle = "#00cdff"
      ctx.fillText(message.member.displayName, 250, 87);

      // Generate role texts
      // beginY+=560;
      // let rows = [
      //   {row: 1, roles: [message.member.roles.cache.first(2)[1].id], width: 0}
      // ];
      // ctx.font = '16pt FRAHV';
      // let length = 0;
      // message.member.roles.cache.forEach((role, index) => {
      //   if (limitRoles.includes(role.id) && role.name !== '@everyone') {
      //     length += ctx.measureText(role.name.toUpperCase()).width+(padding*2);
      //     if(length >= 480-(padding*2)){
      //       length = ctx.measureText(role.name.toUpperCase()).width+(padding*2);
      //       rows.push({row: rows[rows.length-1].row+1, roles: [index], width: length});
      //     } else {
      //       length+=spaceX
      //       if(!rows[rows.length-1].roles.includes(role.id))
      //         rows[rows.length-1].roles.push(role.id)
      //       rows[rows.length-1].width = length
      //     }
      //   }
      // });
      // ctx.textAlign = "left";
      // rows.forEach(row => {
      //   beginX = 250-((row.width/2))
      //   row.roles.forEach((r, index) => {
      //     let role = message.member.roles.cache.find(i => i.id === r)
      //     let roleColor = role.color.toString(16).padStart(6, '0')
      //     if(role){
      //       let length = ctx.measureText(role.name.toUpperCase()).width;
      //       if(endX > beginX){
      //         ctx.fillStyle = "#0c202e";
      //         roundRect(ctx, beginX, beginY-26, length+(padding*2), parseInt(fontSize)+7, 22, true, false);
      //         ctx.fillStyle = `#${roleColor}`
      //         ctx.fillText(role.name.toUpperCase(), beginX+padding, beginY);
      //       }
      //       beginX+=length+spaceX+(padding*2);
      //     }
      //   })
      //   beginY+=55
      // })

      await loadImage(message.member.displayAvatarURL({ format: "png", dynamic: true, size: 512 })).then(avatar => {
        let avatarX = 310;
        let avatarY = 310;
        let avatarCanvas = createCanvas(avatarX, avatarY);
        let avatarCtx = avatarCanvas.getContext('2d');
        avatarCtx.beginPath();
        avatarCtx.arc(avatarX/2, avatarY/2, 150, 0, Math.PI * 2, true);
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
      })

      let sfBuffer = new Buffer.from(canvas.toDataURL().split(",")[1], "base64")
      message.reply({
        files: [
          {
            attachment: sfBuffer
          }
        ]
      });
    })
  });

  return null;
};

module.exports.help = {
  name: 'fellowcard'
};