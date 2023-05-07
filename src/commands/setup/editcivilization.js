const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    const messageID = args[0];
    const editQuery = args.slice(1).join(" ");

    if(!messageID) return message.reply("`messageid` `reason`").catch((e) => {});
    if(!editQuery) return message.reply("`messageid` `reason`").catch((e) => {});

    try {
        const emblemChannel = message.guild.channels.cache.get(
            "1049815440198733895"
        );

        const guideEmbed = await emblemChannel.messages.fetch(messageID);
        const editEmbed = new MessageEmbed()
            .setDescription(editQuery)
            .setColor(`#2b2d31`)
        
        message.channel.send("Civilizations: **EDITED** ! `updated`").catch((e) => {});
        guideEmbed.edit({ embeds: [editEmbed] }).catch((e) => {});

    } catch (err) {
        console.log(err);
        message.channel.send(`That civilization embed id doesn't exist.`).catch((e) => {});
    }
}

module.exports.help = {
    name: 'editcivilization'
}