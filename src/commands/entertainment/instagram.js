const { MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");
const instaClient = require('scraper-instagram');
const insta = new instaClient();
const moment = require('moment');
moment.locale('id');

module.exports.run = async (client, message, args) => {
        
        let query = args.join(' ');
        if (!query) return message.reply('By the moonlight, who you seeks for?');
        if (query.includes('http')) query = query.split('/').pop();

        const data = await insta.getProfile(query);
        if (!data) return message.reply('No username found on the list');

    const embed = new MessageEmbed()
        .setColor('#C13584')
        .setAuthor(data.name, 'https://cdn.discordapp.com/emojis/335186186718937098.png', data.link)
        .setDescription(`${data.bio}`)
        .addField('Posts', `${data.posts}`, true)
        .addField('Followers', `${data.followers}` ? `${data.followers}` : '-', true)
        .addField('Following', `${data.following}` ? `${data.following}` : '-', true)
        .addField('Private', data.private ? '`yes`' : '`no`', true)
        .addField('Verified', data.verified ? '`yes`' : '`no`⁣', true)
        .addField('Website', data.website, true)
        .setImage(data.pic)

    const buttonProfile = new MessageButton()
        .setStyle("url")
        .setLabel("Redirect to Instagram")
        .setURL(data.link)

    await message.channel.send({
        button: buttonProfile,
        embed: embed
    })
}

module.exports.help = {
    name: 'ig'
}
