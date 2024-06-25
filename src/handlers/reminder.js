const fs = require("fs");
const path = require("path");
const express = require("express");
const { EmbedBuilder } = require("discord.js");

const app = express();
const reminderFile = path.resolve(__dirname, '../config/reminder.json');

app.use(express.json());

// Endpoint to update reminder.json
app.post("/updateReminder", (req, res) => {
  try {
    const reminders = req.body.reminders;
    if (!reminders || !Array.isArray(reminders)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    fs.writeFileSync(reminderFile, JSON.stringify(reminders, null, 2));
    res.json({ message: "Reminder file updated successfully" });
  } catch (err) {
    console.error("Error updating reminder file:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
              try {
                const channel = await client.channels.fetch(reminder.channel);
                const embedReminder = new EmbedBuilder()
                  .setAuthor({ name: `${client.users.cache.get(reminder.user).username}'s Reminder`, iconURL: client.users.cache.get(reminder.user).displayAvatarURL() })
                  .setDescription(`*" ${reminder.reminderMessage} "*`)
                  .setColor(client.config.embedColorTrans);

                await channel.send({
                  content: `<:ancientluna_divinare:841754250949820416><@${reminder.user}>╮`,
                  embeds: [embedReminder]
                });

                const msg = await channel.messages.fetch(reminder.loadingMsgId);
                if (msg) {
                  await msg.edit({ content: `Just successfully **reminded** you.` });
                }

                removeReminder(reminder);
              } catch (err) {
                console.error('Error handling reminder:', err);
                removeReminder(reminder);
              }
            }, timeLeft);
          } else {
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
  fs.writeFileSync(reminderFile, JSON.stringify(reminders, null, 2));
}

module.exports = { loadReminders, app };
