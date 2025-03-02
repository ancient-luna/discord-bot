const fs = require("fs");
const path = require("path");
const { EmbedBuilder } = require("discord.js");

const reminderFile = path.resolve(__dirname, "../config/reminder.json");

function loadReminders(client) {
    const reminders = readReminders();
    reminders.forEach(reminder => {
        scheduleReminder(reminder, client);
    });
}

function scheduleReminder(reminder, client) {
    const delay = reminder.timeCounter - Date.now();

    if (delay <= 0) {
        // If the reminder time has already passed, send it immediately
        sendReminder(reminder, client);
        removeReminder(reminder.timeCounter);
        return;
    }

    setTimeout(() => {
        sendReminder(reminder, client);
        removeReminder(reminder.timeCounter);
    }, delay);
}

async function sendReminder(reminder, client) {
    try {
        const channel = await client.channels.fetch(reminder.channel);
        const user = await client.users.fetch(reminder.user);

        const embedReminder = new EmbedBuilder()
            .setAuthor({ name: `${user.username}'s Reminder`, iconURL: user.displayAvatarURL() })
            .setDescription(`*" ${reminder.reminderMessage} "*`)
            .setColor(client.config.embedColorTrans);

        await channel.send({ content: `<@${reminder.user}>`, embeds: [embedReminder] });

        const msg = await channel.messages.fetch(reminder.loadingMsgId);
        if (msg) await msg.edit({ content: `Successfully **reminded** you` });

    } catch (err) {
        console.error("Error handling reminder:", err);
    }
}

function readReminders() {
    try {
        if (!fs.existsSync(reminderFile)) return [];
        const data = fs.readFileSync(reminderFile, "utf8");
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error("Error reading reminders:", err);
        return [];
    }
}

function writeReminders(reminders) {
    try {
        fs.writeFileSync(reminderFile, JSON.stringify(reminders, null, 2));
    } catch (err) {
        console.error("Error writing reminders:", err);
    }
}

function removeReminder(timeCounter) {
    let reminders = readReminders();
    reminders = reminders.filter(r => r.timeCounter !== timeCounter);
    writeReminders(reminders);
}

module.exports = { loadReminders };