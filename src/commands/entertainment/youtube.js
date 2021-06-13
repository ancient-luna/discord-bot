const { MessageEmbed, Client } = require("discord.js");
const { MessageButton } = require("discord-buttons");
const fetch = require("node-fetch");

module.exports.run = async (Client, message) => {
    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send(`You have to be in **watchmovie** or **chattime** voice channel`)

    fetch (`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "755600276941176913",
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
            .setDescription(`Watch **[YouTube Together](https://discord.com/invite/${invite.code})** without ads in Ancient Luna\nonly **chattime** and **watchmovie** channel allowed`)
            .setFooter(`Supported for PC ver. only`)
            .setColor('7289da')

        const buttonWatch = new MessageButton()
            .setStyle("url")
            .setLabel("Start watch together")
            .setURL(`https://discord.com/invite/${invite.code}`)
        
        message.channel.send({
            button: buttonWatch,
            embed: embed
        })
    })
}

module.exports.help = {
    name: 'youtube'
}