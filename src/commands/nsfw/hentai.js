const { MessageEmbed } = require("discord.js");
const axios = require('axios');

module.exports.run = async (Client, message, args) => {

    var errMessage = { content: "This is not an NSFW Channel 💢"  };
    if (!message.channel.nsfw) {
        message.react("💢").catch((e) => {});

        return message.reply(errMessage).then((msg) => {
            setTimeout(() => msg.delete().catch((e) => {}), 5000);
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

        if (!url[0]) return message.reply({ content: 'Your query returned no results' }).catch((e) => {});

        const embed = new MessageEmbed()
            .setTitle(`Feels hot now?`)
            .setDescription(`I know you like this kind of style <@${message.author.id}> ...`)
            .setColor('#985ce7')
            .setImage(url);

        message.channel.send({ embeds: [embed] });
    } catch (error) {
        return message.channel.send({ content: `I know you are thirsty.. but i can't pleasure you with \`${args}\`\nTry available tag to make more lust` }).catch((e) => {});
    }
}

module.exports.help = {
    name: 'hentai',
    aliases: 'searchhentai'
}
