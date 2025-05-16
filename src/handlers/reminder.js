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
        const guild = client.guilds.cache.get(reminder.guild);
        if (!guild) return removeReminder(reminder.timeCounter, client);
        const member = await guild.members.fetch(reminder.user).catch(() => null);
        if (!member) return removeReminder(reminder.timeCounter, client);

        const embedReminder = new EmbedBuilder()
            .setAuthor({ name: `${member.displayName}'s Reminder`, iconURL: member.displayAvatarURL() })
            .setDescription(`*" ${reminder.reminderMessage} "*`)
            .setColor(client.config.embedColorTrans);

        await channel.send({ content: `<@${reminder.user}>`, embeds: [embedReminder] });

        const msg = await channel.messages.fetch(reminder.loadingMsgId).catch(() => null);
        if (msg) await msg.edit({ content: `Successfully **reminded** you` });

        // Remove reminder AFTER sending
        await removeReminder(reminder.timeCounter, client);

    } catch (err) {
        console.error("Error handling reminder:", err);
        // On error, try removing it anyway to prevent spam
        await removeReminder(reminder.timeCounter, client);
    }
}

async function removeReminder(timeCounter, client) {
    let all = await client.db.get("reminders") || [];
    all = all.filter(r => r.timeCounter !== timeCounter);
    await client.db.set("reminders", all);
}

module.exports = { loadReminders };