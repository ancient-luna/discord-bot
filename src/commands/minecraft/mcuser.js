const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const request = require("request");

module.exports.run = async (Client, message, args) => {
    if (!args[0]) return message.reply({ content: 'Hey, you forgot to put their name' });

        request({
            url: `https://api.mojang.com/users/profiles/minecraft/${args[0]}`,
            json: true
        }, async function (error, response, body) {
            if (error) return console.log(error)
            else {
                if (!body) return message.reply({ content: `${args[0]}? never heard of them and I believe that they're not exist` });
                let namehistory = [];

                request({
                    url: `https://api.mojang.com/user/profiles/${body.id}/names`,
                    json: true
                }, async function (error, response, body) {
                    if (error) return;
                    else {
                        if (!body) return;
                        return;
                    }
                })

                const getInfo = await message.reply({ content: 'Getting user information <a:_util_loading:863317596551118858>' });

                const mcUser = new MessageEmbed()
                .setTitle(body.name)
                .setURL(`https://namemc.com/profile/${body.name}`)
                .setImage(`https://visage.surgeplay.com/bust/${body.id}`)
                .setColor('2f3136')
                .setFooter({ text: `UUID ${body.id}` })

                const previewUser = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setStyle('LINK')
                            .setLabel('Detail Info')
                            .setURL(`https://namemc.com/profile/${body.name}`)
                    )

                getInfo.edit({
                    content: '⁣',
                    embeds: [mcUser],
                    components: [previewUser]
                })
            }
        })
}

module.exports.help = {
    name: 'archived-mcuser'
}   