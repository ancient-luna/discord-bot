const fs = require("fs");
const path = require("path");
const { EmbedBuilder } = require("discord.js");

const reminderFile = path.resolve(__dirname, '../config/reminder.json');

/**
 * @param {import("../index")} client
 */

function loadReminders(client) {
    if (fs.existsSync(reminderFile)) {
        try {
            const fileContent = fs.readFileSync(reminderFile, 'utf8');
            if (fileContent) {
                const reminders = JSON.parse(fileContent);
                reminders.forEach(reminder => {
                    const timeLeft = reminder.timeCounter - Date.now();
                    if (timeLeft > 0) {
                        setTimeout(async () => {
                            const channel = await client.channels.fetch(reminder.channel);
                            const embedReminder = new EmbedBuilder()
                                .setAuthor({ name: `${client.users.cache.get(reminder.user).username}'s Reminder`, iconURL: client.users.cache.get(reminder.user).displayAvatarURL() })
                                .setDescription(`*" ${reminder.reminderMessage} "*`)
                                .setColor(client.config.embedColorTrans)
                                // .setFooter({ text: `Reminder was set` });

                            channel.send({
                                content: `<:ancientluna_divinare:841754250949820416><@${reminder.user}>╮`,
                                embeds: [embedReminder]
                            });

                            // Fetch and edit the loading message
                            const msg = await channel.messages.fetch(reminder.loadingMsgId);
                            if (msg) {
                                msg.edit({ content: `Just successfully **reminded** you.` });
                            }
                            removeReminder(reminder);
                        }, timeLeft);
                    } else {
                        // Remove expired reminder
                        removeReminder(reminder);
                    }
                });
            } else {
                console.log('Reminder file is empty.');
            }
        } catch (err) {
            console.error('Error parsing reminder file:', err);
        }
    } else {
        console.log('Reminder file does not exist.');
    }
}

function removeReminder(reminder) {
    let reminders = JSON.parse(fs.readFileSync(reminderFile));
    reminders = reminders.filter(r => r.timeCounter !== reminder.timeCounter);
    fs.writeFileSync(reminderFile, JSON.stringify(reminders));
}

module.exports = { loadReminders };