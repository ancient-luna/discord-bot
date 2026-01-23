const { MessageFlags, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize, MediaGalleryBuilder, AttachmentBuilder, ButtonBuilder, SectionBuilder } = require("discord.js");
const { createCanvas, loadImage } = require('canvas');

function getMillisecondsUntilMidnightGMT7() {
    const now = new Date();

    const gmt7Offset = 7 * 60; // GMT+7 in minutes
    const localOffset = now.getTimezoneOffset();
    const gmt7Time = new Date(now.getTime() + (gmt7Offset + localOffset) * 60 * 1000);

    const nextMidnight = new Date(gmt7Time);
    nextMidnight.setHours(24, 0, 0, 0); // set to next midnight

    const nextMidnightLocal = new Date(nextMidnight.getTime() - (gmt7Offset + localOffset) * 60 * 1000);

    return nextMidnightLocal.getTime() - now.getTime();
}

function getPreviousMidnightGMT7() {
    const now = new Date();

    const gmt7Offset = 7 * 60; // GMT+7 in minutes
    const localOffset = now.getTimezoneOffset();
    const gmt7Time = new Date(now.getTime() + (gmt7Offset + localOffset) * 60 * 1000);

    const prevMidnight = new Date(gmt7Time);
    prevMidnight.setHours(0, 0, 0, 0); // set to midnight

    const prevMidnightLocal = new Date(prevMidnight.getTime() - (gmt7Offset + localOffset) * 60 * 1000);

    return prevMidnightLocal.getTime();
}

function isSameDayGMT7(timestamp1, timestamp2) {
    const d1 = new Date(timestamp1);
    const d2 = new Date(timestamp2);

    const gmt7Offset = 7 * 60; // minutes
    const localOffset = d1.getTimezoneOffset();

    const t1 = new Date(d1.getTime() + (gmt7Offset + localOffset) * 60 * 1000);
    const t2 = new Date(d2.getTime() + (gmt7Offset + localOffset) * 60 * 1000);

    return t1.getUTCFullYear() === t2.getUTCFullYear() &&
        t1.getUTCMonth() === t2.getUTCMonth() &&
        t1.getUTCDate() === t2.getUTCDate();
}

async function sendRadianceMessage(client) {
    try {
        const channelId = client.config.luminanceChannel;
        const channel = await client.channels.fetch(channelId);

        if (!channel) {
            client.console.log(`Luminance channel not found: ${channelId}`, "error");
            return;
        }

        const lastSentTime = await client.db.get("radiance_last_sent_time");
        if (lastSentTime && Date.now() - lastSentTime < 60000) {
            client.console.log("Radiance message already sent recently. Skipping.", "scheduler");
            return;
        }

        try {
            let deleted = false;
            const lastMessageId = await client.db.get("radiance_message_id");

            if (lastMessageId) {
                const previousMessage = await channel.messages.fetch(lastMessageId).catch(() => null);

                if (previousMessage) {
                    await previousMessage.delete();
                    await client.db.delete("radiance_message_id");
                    client.console.log('Deleted previous radiance message (ID from DB)', "scheduler");
                    deleted = true;
                } else {
                    client.console.log('Previous radiance message not found via ID. Attempting fallback scan.', "scheduler");
                }
            }

            if (!deleted) {
                const messages = await channel.messages.fetch({ limit: 100 });
                const previousMessage = messages.find(msg =>
                    msg.author.id === client.user.id &&
                    (
                        msg.attachments.size > 0 ||
                        (msg.content && msg.content.includes('Gratitude from the Ancients')) ||
                        (msg.components.length > 0 && msg.components.some(row =>
                            row.components.some(c => c.label === 'Testaments of the Seekers' || (c.data && c.data.label === 'Testaments of the Seekers'))
                        ))
                    )
                );

                if (previousMessage) {
                    await previousMessage.delete();
                    if (lastMessageId) await client.db.delete("radiance_message_id");
                    client.console.log('Deleted previous radiance message (Fallback Scan)', "scheduler");
                }
            }
        } catch (error) {
            client.console.log(`Error deleting previous message: ${error.message}`, "warn");
        }

        const guild = channel.guild;

        const roleIds = [
            client.config.lunaBoosterRole,
            client.config.radianceRole
        ];

        const allMembers = { luminance: [], radiance: [] };

        for (const roleId of roleIds) {
            const role = guild.roles.cache.get(roleId);
            if (role) {
                const members = role.members.map(member => member).sort((a, b) => a.displayName.localeCompare(b.displayName));
                if (roleId === client.config.lunaBoosterRole) {
                    allMembers.luminance.push(...members);
                } else if (roleId === client.config.radianceRole) {
                    allMembers.radiance.push(...members);
                }
            }
        }

        if (allMembers.luminance.length === 0 && allMembers.radiance.length === 0) {
            client.console.log('No members found for radiance message', "warn");
            return;
        }

        const avatarUrls = [...allMembers.luminance, ...allMembers.radiance].map(member => member.displayAvatarURL({ extension: 'png', size: 128 }));
        const luminanceMentions = allMembers.luminance.map(member => `<@${member.id}>`).join(' ') || 'No members';
        const radianceMentions = allMembers.radiance.map(member => `<@${member.id}>`).join(' ') || 'No members';

        const canvas = createCanvas(1730, 441);
        const ctx = canvas.getContext('2d');

        const cols = 16;
        const rows = 5;
        const size = 110;
        const margin = 5;
        const radius = 16;

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#0f1114');
        gradient.addColorStop(1, '#22272e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const images = await Promise.all(avatarUrls.map(url => loadImage(url)));

        const positions = [];
        for (let row = -1; row <= rows; row++) {
            for (let col = -1; col <= cols; col++) {
                positions.push({ row, col });
            }
        }

        positions.sort(() => Math.random() - 0.5);

        const totalWidth = cols * size + (cols - 1) * margin;
        const totalHeight = rows * size + (rows - 1) * margin;
        const startX = (canvas.width - totalWidth) / 2;
        const startY = (canvas.height - totalHeight) / 2;

        const gridRows = rows + 2;
        const gridCols = cols + 2;
        const grid = Array(gridRows).fill(null).map(() => Array(gridCols).fill(-1));
        function canPlaceImage(row, col, imageIndex) {
            const gridRow = row + 1;
            const gridCol = col + 1;

            if (gridCol > 0 && grid[gridRow][gridCol - 1] === imageIndex) return false;
            if (gridCol < gridCols - 1 && grid[gridRow][gridCol + 1] === imageIndex) return false;
            if (gridRow > 0 && grid[gridRow - 1][gridCol] === imageIndex) return false;
            if (gridRow < gridRows - 1 && grid[gridRow + 1][gridCol] === imageIndex) return false;
            return true;
        }

        for (let i = 0; i < positions.length; i++) {
            const { row, col } = positions[i];

            let imageIndex = i % images.length;
            let attempts = 0;
            while (!canPlaceImage(row, col, imageIndex) && attempts < images.length) {
                imageIndex = (imageIndex + 1) % images.length;
                attempts++;
            }

            grid[row + 1][col + 1] = imageIndex;

            const x = startX + col * (size + margin);
            const y = startY + row * (size + margin);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const angle = Math.PI / 180 * 10;
            const rotatedX = Math.cos(angle) * (x - centerX) - Math.sin(angle) * (y - centerY) + centerX;
            const rotatedY = Math.sin(angle) * (x - centerX) + Math.cos(angle) * (y - centerY) + centerY;

            ctx.save();
            ctx.translate(rotatedX + size / 2, rotatedY + size / 2);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(-size / 2 + radius, -size / 2);
            ctx.arcTo(size / 2, -size / 2, size / 2, size / 2, radius);
            ctx.arcTo(size / 2, size / 2, -size / 2, size / 2, radius);
            ctx.arcTo(-size / 2, size / 2, -size / 2, -size / 2, radius);
            ctx.arcTo(-size / 2, -size / 2, size / 2, -size / 2, radius);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(images[imageIndex], -size / 2, -size / 2, size, size);

            ctx.restore();
        }

        const radiance = new AttachmentBuilder(canvas.toBuffer(), { name: 'radiance.png' });

        const luminanceEmoji = '<:lumi_1:1461957807749468190><:lumi_2:1461957809573986367><:lumi_3:1461957812006424781><:lumi_4:1461957814787510481><:lumi_5:1461957816939184160>';

        const container = new ContainerBuilder();
        const textHeader = new TextDisplayBuilder().setContent('# 𝕲𝖗𝖆𝖙𝖎𝖙𝖚𝖉𝖊 𝖋𝖗𝖔𝖒 𝖙𝖍𝖊 𝕬𝖓𝖈𝖎𝖊𝖓𝖙𝖘');
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large });
        const textContent = new TextDisplayBuilder().setContent(`-# By the first breath of moonlight, a vow was sealed, and a sanctuary took form. Now we gather once more, as what was begun stirs again, rising not by His will alone, but through the quiet luminance you carry`);
        // const textRadiance = new TextDisplayBuilder().setContent(`### <:ico_radiance:1334864373331787827> <@&${client.config.radianceRole}>\n-# *Guided by the Radiance: those who keep our light enduring*`);
        // const textRadianceMentions = new TextDisplayBuilder().setContent(radianceMentions);
        const textLuminance = new TextDisplayBuilder().setContent(`Honoring the ${luminanceEmoji} our sanctuary's uplifted souls:`);
        const textLuminanceMentions = new TextDisplayBuilder().setContent(luminanceMentions);
        const textTimeUpdate = new TextDisplayBuilder().setContent(`-# <:ic_repost:1334863701026541648> *Updates every day at 00:00 (UTC+7)*`);

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
                    url: 'https://i.imgur.com/nLQReck.png'
                }
            }]);

        const supportButton = new ButtonBuilder()
            .setLabel('Testaments of the Seekers')
            .setStyle('Link')
            .setEmoji('<:ico_owner:1369186022558269561>')
            .setURL('https://discord.com/channels/1457941632052756634/1459865586807869533');

        const sectionHeader = new SectionBuilder()
            .addTextDisplayComponents(textHeader)
            .setButtonAccessory(supportButton);

        container.addSectionComponents(sectionHeader)
        container.addTextDisplayComponents(textContent)
        container.addMediaGalleryComponents(mediaSeeker)
        // container.addSeparatorComponents(separator)
        // container.addTextDisplayComponents(textRadiance)
        // container.addTextDisplayComponents(textRadianceMentions)
        // container.addSeparatorComponents(separator);
        container.addTextDisplayComponents(textLuminance)
        container.addTextDisplayComponents(textLuminanceMentions)
        container.addMediaGalleryComponents(mediaSign);
        container.addTextDisplayComponents(textTimeUpdate)

        const sentMessage = await channel.send({
            flags: MessageFlags.IsComponentsV2,
            components: [container],
            files: [radiance],
            allowedMentions: { parse: [] },
        });

        await client.db.set("radiance_message_id", sentMessage.id);
        await client.db.set("radiance_last_sent_time", Date.now());

    } catch (error) {
        client.console.log(`Error sending radiance message: ${error.message}`, "error");
        console.error(error);
    }
}

function scheduleNextRadianceMessage(client) {
    const delay = getMillisecondsUntilMidnightGMT7();

    setTimeout(async () => {
        await sendRadianceMessage(client);
        scheduleNextRadianceMessage(client);
    }, delay);
}

async function initRadianceScheduler(client) {
    client.console.log('Radiance scheduler initialized', "scheduler");

    try {
        const channelId = client.config.luminanceChannel;
        const channel = await client.channels.fetch(channelId).catch(() => null);

        if (!channel) {
            client.console.log(`Luminance channel not found during init: ${channelId}`, "error");
            scheduleNextRadianceMessage(client);
            return;
        }

        const messages = await channel.messages.fetch({ limit: 100 });

        const radianceMessages = messages.filter(msg =>
            msg.attachments.size > 0 ||
            (msg.content && msg.content.includes('Gratitude from the Ancients')) ||
            msg.components.length > 0 ||
            msg.embeds.length > 0
        );

        const now = Date.now();
        let messageForToday = null;

        const sortedMessages = radianceMessages.sort((a, b) => b.createdTimestamp - a.createdTimestamp);

        if (sortedMessages.size > 0) {
            const newestMessage = sortedMessages.first();

            if (isSameDayGMT7(newestMessage.createdTimestamp, now)) {
                messageForToday = newestMessage;
                client.console.log(`Found valid radiance message for today (ID: ${newestMessage.id})`, "scheduler");
            }
        }

        const messagesToDelete = sortedMessages.filter(msg => msg.id !== messageForToday?.id);

        if (messagesToDelete.size > 0) {
            client.console.log(`Deleting ${messagesToDelete.size} stale radiance messages...`, "scheduler");
            for (const msg of messagesToDelete.values()) {
                await msg.delete().catch(e => client.console.log(`Failed to delete msg ${msg.id}: ${e.message}`, "warn"));
            }
        }

        if (messageForToday) {
            await client.db.set("radiance_message_id", messageForToday.id);
            await client.db.set("radiance_last_sent_time", messageForToday.createdTimestamp);
            scheduleNextRadianceMessage(client);
            return;
        }

        const lastSentTime = await client.db.get("radiance_last_sent_time");
        if (lastSentTime && isSameDayGMT7(lastSentTime, now)) {
            client.console.log('DB says radiance message already sent today (but not found in channel). Waiting for next schedule.', "scheduler");
            scheduleNextRadianceMessage(client);
            return;
        }

        client.console.log('No radiance message sent today. Sending new one immediately.', "scheduler");
        await sendRadianceMessage(client);

    } catch (err) {
        client.console.log(`Error in radiance scheduler init: ${err.message}`, "error");
        console.error(err);
    }
    scheduleNextRadianceMessage(client);
}

module.exports = initRadianceScheduler;