const { MessageEmbed, Client } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (Client, message, args) => {
    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send(`You have to be in **watchmovie** voice channel`)

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
        message.channel.send(`https://discord.com/invite/${invite.code}`)
    })
}

module.exports.help = {
    name: 'youtube'
}