const { MessageFlags, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize, MediaGalleryBuilder, AttachmentBuilder, ButtonBuilder, SectionBuilder } = require("discord.js");
const { createCanvas, loadImage } = require('canvas');

/**
 * Calculate milliseconds until next 00:00 GMT+7
 * @returns {number} Milliseconds until next midnight GMT+7
 */
function getMillisecondsUntilMidnightGMT7() {
    const now = new Date();
    
    // Convert current time to GMT+7
    const gmt7Offset = 7 * 60; // GMT+7 in minutes
    const localOffset = now.getTimezoneOffset(); // Local offset in minutes (negative for ahead of UTC)
    const gmt7Time = new Date(now.getTime() + (gmt7Offset + localOffset) * 60 * 1000);
    
    // Calculate next midnight GMT+7
    const nextMidnight = new Date(gmt7Time);
    nextMidnight.setHours(24, 0, 0, 0); // Set to next midnight
    
    // Convert back to local time
    const nextMidnightLocal = new Date(nextMidnight.getTime() - (gmt7Offset + localOffset) * 60 * 1000);
    
    return nextMidnightLocal.getTime() - now.getTime();
}

/**
 * Calculate timestamp of the most recent 00:00 GMT+7
 * @returns {number} Timestamp of previous midnight GMT+7
 */
function getPreviousMidnightGMT7() {
    const now = new Date();
    
    // Convert current time to GMT+7
    const gmt7Offset = 7 * 60; // GMT+7 in minutes
    const localOffset = now.getTimezoneOffset(); // Local offset in minutes (negative for ahead of UTC)
    const gmt7Time = new Date(now.getTime() + (gmt7Offset + localOffset) * 60 * 1000);
    
    // Calculate previous midnight GMT+7
    const prevMidnight = new Date(gmt7Time);
    prevMidnight.setHours(0, 0, 0, 0); // Set to midnight
    
    // Convert back to local time
    const prevMidnightLocal = new Date(prevMidnight.getTime() - (gmt7Offset + localOffset) * 60 * 1000);
    
    return prevMidnightLocal.getTime();
}

/**
 * Send the radiance message to the luminance channel
 * @param {import("../index")} client 
 */
async function sendRadianceMessage(client) {
    try {
        const channelId = client.config.luminanceChannel;
        const channel = await client.channels.fetch(channelId);
        
        if (!channel) {
            client.console.log(`Luminance channel not found: ${channelId}`, "error");
            return;
        }

        // Check for double-send (prevent sending if sent less than 1 minute ago)
        const lastSentTime = await client.db.get("radiance_last_sent_time");
        if (lastSentTime && Date.now() - lastSentTime < 60000) {
            client.console.log("Radiance message already sent recently. Skipping.", "scheduler");
            return;
        }

        // Delete previous radiance message using stored ID or fallback scan
        try {
            let deleted = false;
            const lastMessageId = await client.db.get("radiance_message_id");
            
            if (lastMessageId) {
                client.console.log(`Attempting to delete previous message with ID: ${lastMessageId}`, "debug");
                const previousMessage = await channel.messages.fetch(lastMessageId).catch(() => null);
                
                if (previousMessage) {
                    await previousMessage.delete();
                    await client.db.delete("radiance_message_id");
                    client.console.log('Deleted previous radiance message (ID from DB)', "scheduler");
                    deleted = true;
                } else {
                    client.console.log('Previous radiance message not found via ID. Attempting fallback scan.', "debug");
                }
            }

            if (!deleted) {
                // Fallback: Scan recent messages if ID failed or wasn't found
                const messages = await channel.messages.fetch({ limit: 20 });
                const previousMessage = messages.find(msg => 
                    msg.author.id === client.user.id && 
                    (
                        msg.attachments.some(a => a.name === 'radiance.png') ||
                        (msg.content && msg.content.includes('Gratitude from the Ancients'))
                    )
                );

                if (previousMessage) {
                    await previousMessage.delete();
                    // Clean up DB if we found it via scan but ID was stale
                    if (lastMessageId) await client.db.delete("radiance_message_id");
                    client.console.log('Deleted previous radiance message (Fallback Scan)', "scheduler");
                }
            }
        } catch (error) {
            client.console.log(`Error deleting previous message: ${error.message}`, "warn");
        }

        const guild = channel.guild;
        
        const roleIds = [
            client.config.luminanceRole,
            client.config.radianceRole
        ];

        const allMembers = { luminance: [], radiance: [] };

        for (const roleId of roleIds) {
            const role = guild.roles.cache.get(roleId);
            if (role) {
                const members = role.members.map(member => member).sort((a, b) => a.displayName.localeCompare(b.displayName));
                if (roleId === client.config.luminanceRole) {
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

        const container = new ContainerBuilder();
        const textHeader = new TextDisplayBuilder().setContent('# Gratitude from the Ancients');
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large });
        const textContent = new TextDisplayBuilder().setContent(`From the first breath of moonlight, a vow was made — and a sanctuary was born. What began as my spark now grows in your glow. Ancient Luna rises, not by my will alone, but through the quiet radiance you carry.`);
        const textRadiance = new TextDisplayBuilder().setContent('### <:ancientluna_divinare:841754250949820416> <@&888736428069105674>\n-# *Guided by the Radiance: those who keep our light enduring*');
        const textRadianceMentions = new TextDisplayBuilder().setContent(radianceMentions);
        const textLuminance = new TextDisplayBuilder().setContent(`### <:ancientluna_divinare_s:859034096192978965> <@&620709364247822338>\n-# *Honoring the Luminance: our sanctuary's uplifted souls*`);
        const textLuminanceMentions = new TextDisplayBuilder().setContent(luminanceMentions);

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
            .setURL('https://discord.com/channels/447069790150852609/1171703846918168577');

        const sectionHeader = new SectionBuilder()
            .addTextDisplayComponents(textHeader)
            .setButtonAccessory(supportButton);

        container.addMediaGalleryComponents(mediaSeeker)
        container.addSectionComponents(sectionHeader)
        container.addTextDisplayComponents(textContent)
        container.addSeparatorComponents(separator)
        container.addTextDisplayComponents(textRadiance)
        container.addTextDisplayComponents(textRadianceMentions)
        container.addSeparatorComponents(separator);
        container.addTextDisplayComponents(textLuminance)
        container.addTextDisplayComponents(textLuminanceMentions)
        container.addMediaGalleryComponents(mediaSign);

        const sentMessage = await channel.send({
            flags: MessageFlags.IsComponentsV2,
            components: [container],
            files: [radiance],
            allowedMentions: { parse: [] },
        });

        // Save message ID and timestamp to DB
        await client.db.set("radiance_message_id", sentMessage.id);
        await client.db.set("radiance_last_sent_time", Date.now());

        client.console.log('Daily radiance message sent successfully', "scheduler");
    } catch (error) {
        client.console.log(`Error sending radiance message: ${error.message}`, "error");
        console.error(error);
    }
}

/**
 * Schedule the next radiance message
 * @param {import("../index")} client 
 */
function scheduleNextRadianceMessage(client) {
    const delay = getMillisecondsUntilMidnightGMT7();
    
    setTimeout(async () => {
        await sendRadianceMessage(client);
        scheduleNextRadianceMessage(client);
    }, delay);
}

/**
 * Initialize the radiance scheduler
 * @param {import("../index")} client 
 */
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

        // 1. Check if a radiance message already exists
        let existingMessage = null;
        const lastMessageId = await client.db.get("radiance_message_id");

        // Try fetching by ID first
        if (lastMessageId) {
            existingMessage = await channel.messages.fetch(lastMessageId).catch(() => null);
        }

        // Fallback: Scan if not found by ID
        if (!existingMessage) {
            const messages = await channel.messages.fetch({ limit: 20 });
            existingMessage = messages.find(msg => 
                msg.author.id === client.user.id && 
                (
                    msg.attachments.some(a => a.name === 'radiance.png') ||
                    (msg.content && msg.content.includes('# Gratitude from the Ancients'))
                )
            );
            
            if (existingMessage) {
                // Found via scan, update DB so we have the correct ID for next time
                await client.db.set("radiance_message_id", existingMessage.id);
                client.console.log(`Found existing radiance message via scan (ID: ${existingMessage.id}). Updating DB.`, "scheduler");
            }
        }

        // 2. Decide action based on existence
        if (existingMessage) {
            client.console.log('Radiance message exists. Waiting for next schedule.', "scheduler");
            // Do nothing, just wait for the schedule
        } else {
            client.console.log('No radiance message found. Sending new one immediately.', "scheduler");
            await sendRadianceMessage(client);
        }

    } catch (err) {
        client.console.log(`Error in radiance scheduler init: ${err.message}`, "error");
        console.error(err);
    }

    // Always start the timer for the next cycle
    scheduleNextRadianceMessage(client);
}

module.exports = initRadianceScheduler;
