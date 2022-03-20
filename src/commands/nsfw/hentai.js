const { MessageEmbed, Client } = require("discord.js");
const { MessageButton } = require("discord.js");
const axios = require('axios');

module.exports.run = async (Client, message, args) => {

    var errMessage = "This is not an NSFW Channel 💢";
    if (!message.channel.nsfw) {
        message.react("💢");

        return message.reply(errMessage).then((msg) => {
            setTimeout(() => msg.delete(), 5000);
        });
    }

    if (!args[0]) return message.reply(`no tags given\n
    \`anal\` \`bj\` \`blowjob\` \`boobs\` \`classic\` 
    \`cum\` \`cum_jpg\` \`erofeet\` \`erokemo\` \`erok\` 
    \`eroyuri\` \`feet\` \`feetg\` \`futanari\` \`hentai\` 
    \`holo\` \`keta\` \`kuni\` \`les\` \`neko\` 
    \`nsfw_neko_gif\` \`pussy\` \`pussy_jpg\` \`pwankg\` 
    \`lewdk\` \`solo\` \`solog\` \`tits\` \`yuri\`

**example:** !hentai \`tag\``);

    try {
        const response = await axios.get(`https://nekos.life/api/v2/img/${args}`);
        const url = response.data.url;

        if (!url[0]) return message.reply('Your query returned no results');

        const embed = new MessageEmbed()
            .setTitle(`Feels hot now?`)
            .setDescription(`I know you like this kind of style <@${message.author.id}> ...`)
            .setColor('#985ce7')
            .setImage(url);

        message.channel.send({ embeds: [embed] });
    } catch (error) {
        return message.channel.send(`I know you are thirsty.. but i can't pleasure you with \`${args}\`\nTry available tag to make more lust`);
    }
}

module.exports.help = {
    name: 'hentai'
}