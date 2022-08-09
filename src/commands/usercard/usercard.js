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
  // const luminanceID = '620709364247822338';
  // const lightseekerID = '839198215580811344';
  // const eldersID = '843523544620335124';
  // const eosID = '907178060992876544';

  // const dandelionID = '873872221368647690';
  // const partnerID = '955668899351912459';

  // const gryffindorID = '997454797156384829';
  // const hufflepuffID = '997455047799611422';
  // const ravenclawID = '997455288741417001';
  // const slytherinID = '997455304243564607';

  // const limitRoles = [
  //   ancestorID,
  //   lunariaID,
  //   luminanceID,
  //   lightseekerID,
  //   eldersID,
  //   eosID,
  //   dandelionID,
  //   partnerID,
  //   gryffindorID,
  //   hufflepuffID,
  //   ravenclawID,
  //   slytherinID
  // ]

  const exceptionRoles = [
    '907179349973815337',
    '980387271087890442',
    '888736428069105674',
    '967037258660200478',
    '990357079640375306',
    '854695964546433084',
    '959980530672218144',
    '980384800349245491',
    '854697282468577300',
    '974666517050445824',
    '988096100357529620',
    '839210689917616218',
    '989457483531714591',
    '979164243049975868',
    '952147085447266364',
    '856379808937410590',
    '874680389459906580',
    '856380073745186876',
    '861400119101095937',
    '981479474531024958',
    '981470521470382090',
    '882350441864777769',
    '959771728429604874',
    '952538746144829500',
    '952538892135956490',
    '952539060805726248',
    '952539186504826910',
    '952539368449515600',
    '952539499404095508',
    '952540596319432724',
    '952540750246203432',
    '952540869267963914',
    '965011358062084107',
    '965012883601760338',
    '965012998957699163',
    '965013399601827930',
    '965013575531905104',
    '965013710370394183',
    '965014043335213056',
    '965014106690179112',
    '974680375811010591',
    '873872577217568768',
    '873873137127813160',
    '884307780276727819',
    '876850078860607518',
    '997456163547402240'
  ]

  fs.readFile('src/assets/usercard/template.png', (err, data) => {
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
      beginY+=560;
      let rows = [
        {row: 1, roles: [message.member.roles.cache.first(2)[1].id], width: 0}
      ];
      ctx.font = '16pt FRAHV';
      let length = 0;
      message.member.roles.cache.forEach((role, index) => {
        if (!exceptionRoles.includes(role.id) && role.name !== '@everyone') {
          length += ctx.measureText(role.name.toUpperCase()).width+(padding*2);
          if(length >= 480-(padding*2)){
            length = ctx.measureText(role.name.toUpperCase()).width+(padding*2);
            rows.push({row: rows[rows.length-1].row+1, roles: [index], width: length});
          } else {
            length+=spaceX
            if(!rows[rows.length-1].roles.includes(role.id))
              rows[rows.length-1].roles.push(role.id)
            rows[rows.length-1].width = length
          }
        }
      });
      ctx.textAlign = "left";
      rows.forEach(row => {
        beginX = 250-((row.width/2))
        row.roles.forEach((r, index) => {
          let role = message.member.roles.cache.find(i => i.id === r)
          let roleColor = role.color.toString(16).padStart(6, '0')
          if(role){
            let length = ctx.measureText(role.name.toUpperCase()).width;
            if(endX > beginX){
              ctx.fillStyle = "#0c202e";
              roundRect(ctx, beginX, beginY-26, length+(padding*2), parseInt(fontSize)+7, 22, true, false);
              ctx.fillStyle = `#${roleColor}`
              ctx.fillText(role.name.toUpperCase(), beginX+padding, beginY);
            }
            beginX+=length+spaceX+(padding*2);
          }
        })
        beginY+=55
      })

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