const { EmbedBuilder } = require("discord.js");

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
        removeReminder(reminder, client);
        return;
    }

    setTimeout(() => {
        sendReminder(reminder, client);
        removeReminder(reminder, client);
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

async function removeReminder(timeCounter, client) {
    const reminders = await client.db.get("reminders") || [];
    const updated = reminders.filter(r => r.timeCounter !== timeCounter);
    await client.db.set("reminders", updated);
}

module.exports = { loadReminders };