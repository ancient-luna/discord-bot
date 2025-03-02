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

        const loadingTxt = await message.reply(`Setting a reminder...\nI will remind you <t:${Math.floor(timeCounter / 1000)}:R> <a:u_load:1334900265953923085>`);

        let embedReminder = new EmbedBuilder()
            .setAuthor({ name: `${message.member.displayName}'s Reminder`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`*" ${reminderMessage} "*`)
            .setColor(client.config.embedColorTrans);

        let reminders = readReminders();
        reminders.push({
            timeCounter,
            reminderMessage,
            user: message.author.id,
            channel: message.channel.id,
            loadingMsgId: loadingTxt.id
        });

        writeReminders(reminders);
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