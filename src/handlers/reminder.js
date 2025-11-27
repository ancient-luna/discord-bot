const { EmbedBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require("discord.js");

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
        if (Date.now() < reminder.timeCounter) {
            return scheduleReminder(reminder, client);
        }

        const channel = await client.channels.fetch(reminder.channel).catch(() => null);
        
        if (channel) {
            const guild = client.guilds.cache.get(reminder.guild);
            if (guild) {
                const member = await guild.members.fetch(reminder.user).catch(() => null);
                
                if (member) {
                    const container = new ContainerBuilder()
                    const textCaller = new TextDisplayBuilder().setContent(`-# what's kept for you is here <@${reminder.user}>`);
                    const textHeader = new TextDisplayBuilder().setContent(`## Reminder`);
                    const textReminder = new TextDisplayBuilder().setContent(`${reminder.reminderMessage}`);

                    container.addTextDisplayComponents(textHeader);
                    container.addTextDisplayComponents(textReminder);

                    await channel.send({
                        flags: MessageFlags.IsComponentsV2,
                        components: [textCaller, container]
                    });

                    const msg = await channel.messages.fetch(reminder.loadingMsgId).catch(() => null);
                    if (msg) await msg.edit({ content: `Successfully **reminded** you` });
                }
            }
        }
    } catch (err) {
        console.error("Error handling reminder:", err);
    } finally {
        await removeReminder(reminder.timeCounter, client);
    }
}

async function removeReminder(timeCounter, client) {
    let all = await client.db.get("reminders") || [];
    all = all.filter(r => r.timeCounter !== timeCounter);
    await client.db.set("reminders", all);
}

module.exports = { loadReminders, scheduleReminder };