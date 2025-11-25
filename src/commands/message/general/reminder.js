const ms = require("ms");

module.exports = new Object({
    name: "reminder",
    description: "setting up a reminder in min/hrs",
    category: "general",
    usage: `reminder <time> <message>`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: { client: [], user: [], dev: false, },
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

        const loadingTxt = await message.reply(`<a:u_load:1334900265953923085> I will remind you <t:${Math.floor(timeCounter / 1000)}:R>\n-# your reminder has been kept under the moonlight`);

        const newReminder = {
            timeCounter,
            reminderMessage,
            user: message.author.id,
            channel: message.channel.id,
            guild: message.guild.id,
            loadingMsgId: loadingTxt.id
        };

        await client.db.push("reminders", newReminder);

        const { scheduleReminder } = require("../../../handlers/reminder");
        scheduleReminder(newReminder, client);
    }
});