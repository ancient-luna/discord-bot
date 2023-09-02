const { EmbedBuilder } = require("discord.js");
const ms = require("ms");
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

        const timeReminder = args[0]
        const reminderMessage = args[1];

        const timeCounter = Date.now() + ms(timeReminder);

        if (!timeReminder) return message.channel.send({ content: "Could you tell me the time? Ex: \`10m\` is 10 minutes." }).catch(e => { });
        if (!reminderMessage) return message.channel.send({ content: "And I need you to define a thing for the timer to remind you about also. Ex: \`We start running to meet the moon\`" }).catch(e => { });
        
        const loadingTxt = await message.reply(`I keep it safe under the moon's name\nI will remind you back <t:${Math.floor(timeCounter/1000)}:R> <a:_util_loading:863317596551118858>`);
        
        let embedReminder = new EmbedBuilder()
            .setAuthor({ name: `${message.member.displayName}'s Reminder`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`*" ${args.slice(1).join(" ")} "*`)
            .setColor('#2b2d31')
            .setFooter({ text: `Reminder was set for ${timeReminder}` })

        setTimeout(async () => {
            message.channel.send({
                content: `<:ancientluna_divinare:841754250949820416><@${message.author.id}>╮`,
                embeds: [embedReminder]
            }).catch(e => { })
            loadingTxt.edit({ content: `Just successfully **reminded** you.` }).catch(e => { })
        }, ms(timeReminder));
    }
});




