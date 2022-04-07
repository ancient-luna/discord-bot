const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (Client, message) => {
    let channel = message.member.voice.channel;

    if(!channel) return message.channel.send(`You have to be in any **voice channel** first in this server`)

    fetch (`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "839380589508558910",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${Client.token}`,
            "Content-Type": "application/json"
        }
    })

    .then(res => res.json())
    .then(invite => {
        if(!invite.code) return message.channel.send("Something wrong with YT-Together link. Don't blame me")

        const embed = new MessageEmbed()
            .setTitle(`Get your snacks and relax 🍿`)
            .setDescription(`**${message.author.username}** has started **[YouTube Together](https://discord.com/invite/${invite.code})** in **${channel.name}**\nWatch YouTube videos without ads in Ancient Luna`)
            .setFooter(`Mobile ver. not supported`, "https://i.imgur.com/7WAJS44.png")
            .setColor('ed0000')

        
        const buttonWatch = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle("url")
                    .setLabel("Join and start watch together")
                    .setURL(`https://discord.com/invite/${invite.code}`)
        )
        
        message.channel.send({
            embeds: [embed],
            components: [buttonWatch]
        })
    })
}

module.exports.help = {
    name: 'youtube'
}
