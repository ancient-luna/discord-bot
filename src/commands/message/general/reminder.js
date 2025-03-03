const { EmbedBuilder } = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const path = require("path");

const reminderFile = path.resolve(__dirname, "../../../config/reminder.json");

module.exports = new Object({
    name: "reminder",
    description: "setting up a reminder in min/hrs",
    category: "general",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        const timeReminder = args[0];
        const reminderMessage = args.slice(1).join(" ");

        if (!timeReminder) return message.channel.send({ content: "Could you tell me the time? Ex: `10m` (10 minutes)." });
        if (!reminderMessage) return message.channel.send({ content: "Please provide a reminder message. Ex: `Meeting at 3 PM`" });

        const timeCounter = Date.now() + ms(timeReminder);

        const loadingTxt = await message.reply(`-# your reminder has been kept under the moonlight\n<a:u_load:1334900265953923085> I will remind you <t:${Math.floor(timeCounter / 1000)}:R>`);

        let embedReminder = new EmbedBuilder()
            .setAuthor({ name: `${message.member.displayName}'s Reminder`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`*" ${reminderMessage} "*`)
            .setColor(client.config.embedColorTrans);

        let reminders = readReminders();
        const newReminder = {
            timeCounter,
            reminderMessage,
            user: message.author.id,
            channel: message.channel.id,
            loadingMsgId: loadingTxt.id
        };

        reminders.push(newReminder);
        writeReminders(reminders);

        setTimeout(async () => {
            try {
                const channel = await client.channels.fetch(newReminder.channel);
                await channel.send({
                    content: `<@${newReminder.user}>`,
                    embeds: [embedReminder]
                });
                
                const msg = await channel.messages.fetch(newReminder.loadingMsgId);
                if (msg) await msg.edit({ content: `Successfully **reminded** you` });

                removeReminder(newReminder.timeCounter); // remove the reminder after sending
            } catch (err) {
                console.error("Error sending reminder:", err);
            }
        }, ms(timeReminder));
    }
});

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