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
        if (!args[0]) return message.channel.send({ content: "Could you tell me the time? Ex: \`10m\` is 10 minutes." }).catch(e => { });
        if (!args[1]) return message.channel.send({ content: "And I need you to define a thing for the timer to remind you about also. Ex: \`We start running to meet the moon\`" }).catch(e => { });
        
        const loadingTxt = await message.reply(`I keep it safe under the moon's name\nI will remind you back in **${args[0]}** <a:_util_loading:863317596551118858>`);
        
        let embedReminder = new EmbedBuilder()
            .setAuthor({ name: `${message.author.displayName}'s Reminder`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`*" ${args.slice(1).join(" ")} "*`)
            .setColor('#1da1f2')
            .setFooter({ text: `Reminder was set for ${args[0]}` })

        setTimeout(async () => {
            message.channel.send({
                content: `<:ancientluna_divinare:841754250949820416><@${message.author.id}>╮`,
                embeds: [embedReminder]
            }).catch(e => { })
            loadingTxt.edit({ content: `Just successfully **reminded** you.` }).catch(e => { })
        }, ms(args[0]));
    }
});




