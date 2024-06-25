const { EmbedBuilder } = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const path = require("path");

const reminderFile = path.resolve(__dirname, '../../../config/reminder.json');

module.exports = new Object({
    name: "reminder",
    description: "reminder.",
    category: "Entertainment",
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

        if (!timeReminder) return message.channel.send({ content: "Could you tell me the time? Ex: `10m` is 10 minutes." });
        if (!reminderMessage) return message.channel.send({ content: "And I need you to define a thing for the timer to remind you about also.\nEx: `We start running to meet the moon`" });

        const timeCounter = Date.now() + ms(timeReminder);

        const loadingTxt = await message.reply(`Setting a reminder...\nI will remind you back <t:${Math.floor(timeCounter / 1000)}:R> <a:_util_loading:863317596551118858>`);

        let embedReminder = new EmbedBuilder()
            .setAuthor({ name: `${message.member.displayName}'s Reminder`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`*" ${reminderMessage} "*`)
            .setColor(client.config.embedColorTrans);

        setTimeout(async () => {
            message.channel.send({
                content: `<@${message.author.id}>`,
                embeds: [embedReminder]
            });

            const channel = await client.channels.fetch(message.channel.id);
            const msg = await channel.messages.fetch(loadingTxt.id);
            if (msg) {
                await msg.edit({ content: `Just successfully **reminded** you.` });
            }
        }, ms(timeReminder));

        // Save the reminder to the JSON file
        let reminders = [];
        if (fs.existsSync(reminderFile)) {
            const fileContent = fs.readFileSync(reminderFile, 'utf8');
            if (fileContent) {
                reminders = JSON.parse(fileContent);
            }
        }

        reminders.push({
            timeCounter: timeCounter,
            reminderMessage: reminderMessage,
            user: message.author.id,
            channel: message.channel.id,
            loadingMsgId: loadingTxt.id
        });

        fs.writeFileSync(reminderFile, JSON.stringify(reminders, null, 2));
    }
});