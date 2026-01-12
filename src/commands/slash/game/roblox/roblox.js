const { SlashCommandBuilder, AttachmentBuilder, ContainerBuilder, MediaGalleryBuilder, MessageFlags, TextDisplayBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require("discord.js");
const axios = require("axios");
const { createCanvas, loadImage } = require("canvas");

function roundRect(ctx, x, y, width, height, radius) {
    radius = typeof radius === 'number' ? radius : 15;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roblox")
        .setDescription("giving roblox profile")
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Roblox Username')
                .setRequired(true)),
    cooldown: 5,
    async execute(client, interaction) {
        const username = interaction.options.getString('username');

        await interaction.deferReply();

        try {
            const userLookup = await axios.post(
                "https://users.roblox.com/v1/usernames/users",
                {
                    usernames: [username],
                    excludeBannedUsers: false,
                },
                { headers: { "Content-Type": "application/json" } }
            );

            if (!userLookup.data.data || !userLookup.data.data.length) {
                return interaction.editReply("**No such name in my book!** Who are you looking for?\n-# Roblox user not found.");
            }

            const basic = userLookup.data.data[0];
            const userId = basic.id;

            const [
                userInfoRes,
                friendsRes,
                followersRes,
                followingRes,
                thumbRes,
                presenceRes,
            ] = await Promise.all([
                axios.get(`https://users.roblox.com/v1/users/${userId}`),
                axios.get(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                axios.get(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                axios.get(`https://friends.roblox.com/v1/users/${userId}/followings/count`),
                axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=true`),
                axios.post(
                    "https://presence.roblox.com/v1/presence/users",
                    { userIds: [userId] },
                    { headers: { "Content-Type": "application/json" } }
                ),
            ]);

            const user = userInfoRes.data;
            const friendsCount = friendsRes.data.count ?? 0;
            const followersCount = followersRes.data.count ?? 0;
            const followingCount = followingRes.data.count ?? 0;

            const thumbData = thumbRes.data.data && thumbRes.data.data[0];
            const avatarUrl = thumbData ? thumbData.imageUrl : null;

            const presenceData = presenceRes.data.userPresences && presenceRes.data.userPresences[0];
            const userPresenceType = presenceData ? presenceData.userPresenceType : 0;

            let statusText = "Offline";
            let statusColor = "#6b7280";
            let statusDotColor = "#6b7280";

            switch (userPresenceType) {
                case 0: // Offline
                    statusText = "Offline";
                    statusColor = "#6b7280";
                    statusDotColor = "#6b7280";
                    break;
                case 1: // Online/Website
                    statusText = "Online";
                    statusColor = "#3b82f6";
                    statusDotColor = "#3b82f6";
                    break;
                case 2: // In Game
                    statusText = "In Game";
                    statusColor = "#22c55e";
                    statusDotColor = "#22c55e";
                    break;
                case 3: // In Studio
                    statusText = "In Studio";
                    statusColor = "#f59e0b";
                    statusDotColor = "#f59e0b";
                    break;
            }

            const created = user.created ? new Date(user.created) : null;
            const joinedStr = created
                ? created.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })
                : "Unknown";

            const profileUrl = `https://www.roblox.com/users/${userId}/profile`;

            const tempCanvas = createCanvas(100, 100);
            const tempCtx = tempCanvas.getContext("2d");
            tempCtx.font = "18px Sans-Serif";

            const descText = user.description && user.description.trim().length
                ? user.description
                : "This user has no description.";

            const maxDescWidth = 900 - 60;
            const words = descText.split(" ");
            let line = "";
            let lineCount = 0;

            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + " ";
                const metrics = tempCtx.measureText(testLine);
                if (metrics.width > maxDescWidth && n > 0) {
                    lineCount++;
                    line = words[n] + " ";
                } else {
                    line = testLine;
                }
            }
            lineCount++;

            const baseDescHeight = 60;
            const lineHeight = 22;
            const descContentHeight = lineCount * lineHeight;
            const descH = Math.max(90, baseDescHeight + descContentHeight + 20);
            const width = 1000;
            const baseHeight = 640;
            const dynamicHeight = baseHeight + Math.max(0, descH - 120);
            const height = dynamicHeight;
            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext("2d");

            const margin = 50;

            const bgGradient = ctx.createLinearGradient(0, 0, width, height);
            bgGradient.addColorStop(0, "#151f2b");
            bgGradient.addColorStop(1, "#0d1723");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            const avatarX = margin + 100;
            const avatarY = margin + 100;
            const avatarRadius = 100;
            ctx.save();
            ctx.beginPath();
            ctx.arc(avatarX, avatarY, avatarRadius + 11, 0, Math.PI * 2);
            ctx.lineWidth = 6;
            ctx.strokeStyle = "#374151";
            ctx.stroke();
            ctx.closePath();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.arc(avatarX, avatarY, avatarRadius + 8, 0, Math.PI * 2);
            const frameGradient = ctx.createLinearGradient(
                avatarX - avatarRadius,
                avatarY - avatarRadius,
                avatarX + avatarRadius,
                avatarY + avatarRadius
            );
            frameGradient.addColorStop(0, "#9ca3af");
            frameGradient.addColorStop(0.5, "#ffffff");
            frameGradient.addColorStop(1, "#4b5563");
            ctx.lineWidth = 10;
            ctx.strokeStyle = frameGradient;
            ctx.stroke();
            ctx.closePath();
            ctx.restore();

            if (avatarUrl) {
                try {
                    const avatarRes = await axios.get(avatarUrl, {
                        responseType: "arraybuffer",
                    });
                    const avatarImg = await loadImage(
                        Buffer.from(avatarRes.data, "binary")
                    );
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(
                        avatarImg,
                        avatarX - avatarRadius,
                        avatarY - avatarRadius,
                        avatarRadius * 2,
                        avatarRadius * 2
                    );
                    ctx.restore();
                } catch (e) {
                    console.error("Avatar load failed:", e);
                }
            }

            const statusX = avatarX + 75;
            const statusY = avatarY + 75;
            ctx.beginPath();
            ctx.arc(statusX, statusY, 16, 0, Math.PI * 2);
            ctx.fillStyle = statusDotColor;
            ctx.fill();
            ctx.lineWidth = 8;
            ctx.strokeStyle = "#0d1723"; // Match bg
            ctx.stroke();
            ctx.closePath();

            const infoX = avatarX + avatarRadius + 60;
            const infoStartY = avatarY - avatarRadius;
            let currentY = infoStartY + 50;

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 48px Sans-Serif";
            const displayName = user.displayName || basic.name;
            ctx.fillText(displayName, infoX, currentY);

            const nameWidth = ctx.measureText(displayName).width;
            const badgeIconX = infoX + nameWidth + 15;
            const badgeIconY = currentY - 38;
            const badgeSize = 38;
            if (user.hasVerifiedBadge) {
                try {
                    const verifiedBadge = await loadImage("./assets/badge_verified.png");
                    ctx.drawImage(verifiedBadge, badgeIconX, badgeIconY, badgeSize, badgeSize);
                } catch (e) {
                    // console.error("Verified badge load failed:", e);
                }
            }

            currentY += 45;
            ctx.fillStyle = "#9ca3af";
            ctx.font = "30px Sans-Serif";
            ctx.fillText(`@${basic.name}`, infoX, currentY);

            currentY += 50;
            const badgeHeight = 40;
            const badgeGap = 20;

            let badgeX = infoX;

            const idGradient = ctx.createLinearGradient(badgeX, currentY - 30, badgeX, currentY - 30 + badgeHeight);
            idGradient.addColorStop(0, "#242e3c");
            idGradient.addColorStop(1, "#242e3c");
            ctx.fillStyle = idGradient;
            roundRect(ctx, badgeX, currentY - 30, 180, badgeHeight, 8);
            ctx.fill();
            ctx.strokeStyle = "#374151";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fillStyle = "#64748b";
            ctx.font = "bold 16px Sans-Serif";
            ctx.fillText("ID:", badgeX + 15, currentY - 4);
            ctx.fillStyle = "#f8fafc";
            ctx.fillText(userId.toString(), badgeX + 50, currentY - 4);

            badgeX += 180 + badgeGap;

            const joinedGradient = ctx.createLinearGradient(badgeX, currentY - 30, badgeX, currentY - 30 + badgeHeight);
            joinedGradient.addColorStop(0, "#242e3c");
            joinedGradient.addColorStop(1, "#242e3c");
            ctx.fillStyle = joinedGradient;
            roundRect(ctx, badgeX, currentY - 30, 230, badgeHeight, 8);
            ctx.fill();
            ctx.strokeStyle = "#374151";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fillStyle = "#64748b";
            ctx.fillText("JOINED:", badgeX + 15, currentY - 4);
            ctx.fillStyle = "#f8fafc";
            ctx.fillText(joinedStr, badgeX + 95, currentY - 4);

            badgeX += 230 + badgeGap;

            const statusBadgeWidth = 160;
            const statusGradient = ctx.createLinearGradient(badgeX, currentY - 30, badgeX, currentY - 30 + badgeHeight);
            statusGradient.addColorStop(0, "#242e3c");
            statusGradient.addColorStop(1, "#242e3c");
            ctx.fillStyle = statusGradient;
            roundRect(ctx, badgeX, currentY - 30, statusBadgeWidth, badgeHeight, 8);
            ctx.fill();
            ctx.strokeStyle = "#374151";
            ctx.lineWidth = 1;
            ctx.stroke();
            // Dot
            ctx.beginPath();
            ctx.arc(badgeX + 25, currentY - 10, 6, 0, Math.PI * 2);
            ctx.fillStyle = statusDotColor;
            ctx.fill();
            ctx.closePath();
            ctx.fillStyle = "#f8fafc";
            ctx.fillText(statusText, badgeX + 45, currentY - 4);

            const cardY = 320;
            const cardW = 280;
            const cardH = 120;
            const gap = 30;

            ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
            ctx.shadowBlur = 15;
            ctx.shadowOffsetY = 5;

            function drawStat(x, label, value, color) {
                const cardGradient = ctx.createLinearGradient(x, cardY, x, cardY + cardH);
                cardGradient.addColorStop(0, "#151f2b");
                cardGradient.addColorStop(1, "#0d1723");
                ctx.fillStyle = cardGradient;
                roundRect(ctx, x, cardY, cardW, cardH, 15);
                ctx.fill();
                ctx.strokeStyle = "#374151";
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.fillStyle = color;
                ctx.beginPath();
                roundRect(ctx, x + 25, cardY + 32, 6, 64, 3);
                ctx.fill();

                ctx.shadowBlur = 0;
                ctx.fillStyle = "#ffffff";
                let fontSize = 42;
                const valueStr = value.toLocaleString();
                const maxTextWidth = cardW - 70;

                ctx.font = `bold ${fontSize}px Sans-Serif`;
                while (ctx.measureText(valueStr).width > maxTextWidth && fontSize > 20) {
                    fontSize -= 2;
                    ctx.font = `bold ${fontSize}px Sans-Serif`;
                }

                ctx.fillText(valueStr, x + 50, cardY + 60);

                ctx.fillStyle = "#9ca3af";
                ctx.font = "20px Sans-Serif";
                ctx.fillText(label, x + 50, cardY + 95);

                ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
                ctx.shadowBlur = 15;
                ctx.shadowOffsetY = 5;
            }

            drawStat(margin, "Connections", friendsCount, "#ef4444");
            drawStat(margin + cardW + gap, "Followers", followersCount, "#3b82f6");
            drawStat(margin + (cardW + gap) * 2, "Following", followingCount, "#22c55e");

            const descY = 480;
            const descW = width - (margin * 2);

            ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
            ctx.shadowBlur = 15;
            ctx.shadowOffsetY = 5;

            const descGradient = ctx.createLinearGradient(margin, descY, margin, descY + descH);
            descGradient.addColorStop(0, "#151f2b");
            descGradient.addColorStop(1, "#0d1723");
            ctx.fillStyle = descGradient;
            roundRect(ctx, margin, descY, descW, descH, 15);
            ctx.fill();
            ctx.strokeStyle = "#374151";
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.shadowBlur = 0;

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 18px Sans-Serif";
            ctx.fillText("DESCRIPTION", margin + 30, descY + 35);

            ctx.fillStyle = "#9ca3af";
            ctx.font = "18px Sans-Serif";

            wrapText(ctx, descText, margin + 30, descY + 60, descW - 60, 22);

            const buffer = canvas.toBuffer("image/png");
            const attachment = new AttachmentBuilder(buffer, { name: `roblox-${userId}.png` });

            const container = new ContainerBuilder()
            const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large, divider: true })
            const card = new MediaGalleryBuilder()
                .addItems([{
                    type: "image",
                    media: { url: `attachment://roblox-${userId}.png` }
                }])
            const footer = new TextDisplayBuilder().setContent(`Click the button to see more about [@${basic.name}](https://www.roblox.com/users/${userId}/profile)`)
            const section = new SectionBuilder()
                .addTextDisplayComponents(footer)
                .setButtonAccessory(button => button
                    .setStyle(ButtonStyle.Link)
                    .setURL(profileUrl)
                    .setLabel(`View ${displayName} Profile`)
                    .setEmoji({
                        name: 'roblox',
                        id: '1456796017625272485'
                    })
                )

            container.addMediaGalleryComponents(card)
            container.addSeparatorComponents(separator)
            container.addSectionComponents(section)

            await interaction.editReply({
                flags: MessageFlags.IsComponentsV2,
                components: [container],
                files: [attachment]
            });

        } catch (err) {
            console.error(err);
            return interaction.editReply(
                "**Under the moonlight!** I'm powerless,\n-# Something went wrong while generating the Roblox card"
            );
        }
    },
};