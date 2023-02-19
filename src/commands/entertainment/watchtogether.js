const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const discordTogether = require("../../utils/activity")

module.exports.run = async (Client, message, args) => {
    let channel = message.member.voice.channel;

    if(!channel) return message.reply(`You have to be in any **voice channel** first in this server`).catch((e) => {});

    discordTogether
        .createTogetherCode(channel.id, 'youtube')
        .then((invite) => 
        
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle(`Get your snacks and relax 🍿`)
                        .setDescription(`**${message.author.username}** has started **[YouTube Together](${invite.code})** in <#${channel.id}>\nWatch YouTube videos without ads in Ancient Luna`)
                        .setFooter({ text: `Mobile ver. not supported`, iconURL: 'https://i.imgur.com/7WAJS44.png' })
                        .setColor('ed0000')
                ],
                components: [
                    new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setStyle("LINK")
                                .setLabel("Join and start watch together")
                                .setURL(invite.code)
                        )
                ]
            }).catch((e) => {})
        )
}

module.exports.help = {
    name: 'watchtogether'
}
