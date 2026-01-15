const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize, MediaGalleryBuilder, SectionBuilder, MessageFlags, ThumbnailBuilder } = require("discord.js");
const fs = require("fs");
const { createCanvas, loadImage, registerFont } = require("canvas");

module.exports = new Object({
  name: "fellowcard",
  description: "giving member information through special card",
  category: "general",
  usage: `fellowcard [@user]`,
  cooldown: 0,
  aliases: ['profile', 'avatar', 'card'],
  examples: [],
  sub_commands: [],
  args: false,
  permissions: { client: [], user: [], dev: false, },
  player: { voice: false, active: false, dj: false, },

  async execute(client, message, args) {
    const member = message.mentions.members.first() || message.member;

    const textCardLoad = new TextDisplayBuilder().setContent(`Signaturing unique card for **${member.displayName}** <a:u_load:1334900265953923085>`);
    const textCardFail = new TextDisplayBuilder().setContent(`Failed to create unique card. **Please try again later**`);

    let loadingTxt = await message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [textCardLoad] });

    const fetchedMembers = await message.guild.members.fetch();
    const joinPosition = Array.from(fetchedMembers
      .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
      .keys())
      .indexOf(member.id) + 1;

    const userJoinTime = parseInt(member.joinedTimestamp / 1000);
    const userCreatedTime = parseInt(member.user.createdTimestamp / 1000);

    const canvas = createCanvas(500, 800);
    const ctx = canvas.getContext("2d");

    registerFont('src/assets/fonts/PaybAck.ttf', { family: 'PaybAck' });
    registerFont('src/assets/fonts/HelveticaBold.ttf', { family: 'HelveticaBold' });

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

        function stripSpecialChars(text) {
          return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F1E0}-\u{1F1FF}]/gu, '')
            .replace(/[^\w\s.,!?'-]/g, '')
            .trim();
        }

        let displayName = stripSpecialChars(member.displayName).toUpperCase();
        let nameFits = false;

        while (!nameFits && nameSize > 10) {
          ctx.font = `${nameSize}px "PaybAck"`;
          let nameWidth = ctx.measureText(displayName).width;
          if (nameWidth <= 500 - 2 * padding) {
            nameFits = true;
          } else {
            nameSize -= 2;
          }
        }

        ctx.textAlign = "center";
        ctx.fillStyle = "#00cdff";
        ctx.fillText(displayName, 250, 87);

        const avatar = await loadImage(member.displayAvatarURL({ extension: "png", dynamic: true, size: 512 }));
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

        const limitRoles = [client.config.ancestorRole, client.config.lunariaRole, client.config.lunaBoosterRole, client.config.lunaTagRole, client.config.lunaMemberRole];

        const sortedRoles = member.roles.cache
          .filter(role => limitRoles?.includes(role.id) && role.name !== '@everyone')
          .sort((a, b) => b.position - a.position);

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
              let role = member.roles.cache.find(i => i.id === r)
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

        const fellowCard = new AttachmentBuilder(canvas.toBuffer(), { name: 'fellowcard.png' })

        const memberAvatar = member.displayAvatarURL({ extension: 'png', size: 2048, dynamic: true });

        const container = new ContainerBuilder();
        const userHeader = new TextDisplayBuilder().setContent(`# 𝕱𝔢𝔩𝔩𝔬𝔴𝔠𝔞𝔯𝔡`);
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large });
        const userCreation = new TextDisplayBuilder().setContent(`-# Member since <t:${userJoinTime}:D> <:sc_verified:1334889120849330266>`)
        const userDetail = new TextDisplayBuilder().setContent(`${member.user.username}\n-# Joined as ${addSuffix(joinPosition)}`);

        const userCard = new MediaGalleryBuilder()
          .addItems([{
            type: 'image',
            media: {
              url: 'attachment://fellowcard.png'
            }
          }])

        const sectionCard = new SectionBuilder()
          .addTextDisplayComponents(userDetail)
          .setButtonAccessory(button => button
            .setStyle(ButtonStyle.Link)
            .setURL(memberAvatar)
            .setLabel('See Avatar')
          )

        container.addTextDisplayComponents(userHeader)
        container.addMediaGalleryComponents(userCard)
        container.addTextDisplayComponents(userCreation)
        container.addSeparatorComponents(separator)
        container.addSectionComponents(sectionCard)

        await loadingTxt.edit({
          flags: MessageFlags.IsComponentsV2,
          components: [container],
          files: [fellowCard],
          allowedMentions: { parse: [] },
        }).then((msg) => { msg.react('ancientluna_divinare:841754250949820416') });
      } catch (error) {
        console.error('Error:', error);
        await loadingTxt.edit({ flags: MessageFlags.IsComponentsV2, components: [textCardFail] });
      }
    });
  }
});

function addSuffix(number) {
  if (number % 100 >= 11 && number % 100 <= 13)
    return number + "th";

  switch (number % 10) {
    case 1: return number + "st";
    case 2: return number + "nd";
    case 3: return number + "rd";
  }
  return number + "th";
};