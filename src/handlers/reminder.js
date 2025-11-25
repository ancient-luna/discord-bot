const { EmbedBuilder } = require("discord.js");

// Max 32-bit signed integer (approx 24.8 days)
const MAX_TIMEOUT = 2147483647;

async function loadReminders(client) {
    const reminders = await client.db.get("reminders") || [];

    reminders.forEach(reminder => {
        scheduleReminder(reminder, client);
    });
}

function scheduleReminder(reminder, client) {
    const delay = reminder.timeCounter - Date.now();

    if (delay <= 0) {
        sendReminder(reminder, client);
        return;
    }

    // If delay is larger than MAX_TIMEOUT, wait MAX_TIMEOUT and then check again
    if (delay > MAX_TIMEOUT) {
        setTimeout(() => {
            scheduleReminder(reminder, client);
        }, MAX_TIMEOUT);
    } else {
        setTimeout(() => {
            sendReminder(reminder, client);
        }, delay);
    }
}

async function sendReminder(reminder, client) {
    try {
        // Double check if it's actually time (in case of early wakeups or logic glitches)
        if (Date.now() < reminder.timeCounter) {
            return scheduleReminder(reminder, client);
        }

        const channel = await client.channels.fetch(reminder.channel).catch(() => null);
        
        // If channel is not found, we can't send, but we should still remove the reminder
        if (channel) {
            const guild = client.guilds.cache.get(reminder.guild);
            // If guild is gone, remove reminder
            if (guild) {
                const member = await guild.members.fetch(reminder.user).catch(() => null);
                
                if (member) {
                    const embedReminder = new EmbedBuilder()
                        .setAuthor({ name: `${member.displayName}'s Reminder`, iconURL: member.displayAvatarURL() })
                        .setDescription(`*" ${reminder.reminderMessage} "*`)
                        .setColor(client.config.embedColorTrans);

                    await channel.send({ content: `<@${reminder.user}>`, embeds: [embedReminder] });

                    const msg = await channel.messages.fetch(reminder.loadingMsgId).catch(() => null);
                    if (msg) await msg.edit({ content: `Successfully **reminded** you` });
                }
            }
        }
    } catch (err) {
        console.error("Error handling reminder:", err);
    } finally {
        // Always remove the reminder after attempting to send
        await removeReminder(reminder.timeCounter, client);
    }
}

async function removeReminder(timeCounter, client) {
    let all = await client.db.get("reminders") || [];
    all = all.filter(r => r.timeCounter !== timeCounter);
    await client.db.set("reminders", all);
}

module.exports = { loadReminders, scheduleReminder };