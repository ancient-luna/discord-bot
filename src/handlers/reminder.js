const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');

const reminderFile = path.resolve(__dirname, '../config/reminder.json');

function loadReminders(client) {
  if (fs.existsSync(reminderFile)) {
    try {
      const fileContent = fs.readFileSync(reminderFile, 'utf8');
      if (fileContent) {
        const reminders = JSON.parse(fileContent);
        reminders.forEach(reminder => {
          scheduleReminder(reminder, client);
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

function scheduleReminder(reminder, client) {
  const cronExpression = new Date(reminder.timeCounter).toISOString().slice(14, 19).replace(':', ' ') + ' * * *';

  cron.schedule(cronExpression, async () => {
    try {
      const channel = await client.channels.fetch(reminder.channel);
      const embedReminder = new EmbedBuilder()
        .setAuthor({ name: `${client.users.cache.get(reminder.user).username}'s Reminder`, iconURL: client.users.cache.get(reminder.user).displayAvatarURL() })
        .setDescription(`*" ${reminder.reminderMessage} "*`)
        .setColor(client.config.embedColorTrans);

      await channel.send({
        content: `<@${reminder.user}>`,
        embeds: [embedReminder],
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
  }, {
    scheduled: true,
    timezone: "Your_Timezone_Here"  // Replace with your specific timezone if needed
  });
}

function removeReminder(reminder) {
  let reminders = JSON.parse(fs.readFileSync(reminderFile));
  reminders = reminders.filter(r => r.timeCounter !== reminder.timeCounter);
  fs.writeFileSync(reminderFile, JSON.stringify(reminders, null, 2));
}

module.exports = { loadReminders };