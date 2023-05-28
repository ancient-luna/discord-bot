const { EmbedBuilder } = require("discord.js");
const ms = require("ms");
module.exports = new Object({
    name: "reminder",
    description: "reminder.",
    category: "Entertainment",
    usage: "",
    cooldown: 0,
    aliases: ['reminder'],
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

        let embed2 = new EmbedBuilder()
            .setAuthor({ name: `${message.author.username}'s Reminder`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`*" ${args.slice(1).join(" ")} "*`)
            .setColor('#2b2d31')
            .setFooter({ text: `Reminder was set for ${args[0]}` })

        message.reply({ content: `<a:_util_loading:863317596551118858> I keep it safe under the moon's name and will remind you back in ${args[0]}!` }).catch(e => { })

        setTimeout(async () => {
            message.channel.send({ content: `<:ancientluna_divinare:841754250949820416><@${message.author.id}>╮`, embeds: [embed2] }).catch(e => { })
        }, ms(args[0]));
    }
});




