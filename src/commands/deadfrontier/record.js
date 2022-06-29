const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const jsdom = require("jsdom");

module.exports.run = async (client, message, args) => {
    const survivorID = args.join(" ");
    if (!survivorID) return message.channel.send("Do `!record` `id`").catch((e) => {});

    const loadingTxt = await message.reply(`Getting player status <a:_util_loading:863317596551118858>`);

    let request = require('request')

    let option = {
        url: `https://www.dfprofiler.com/profile/json/${survivorID}`,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }

    request(option, function (err, responce, body) {
        let stat = JSON.parse(body);

        const domUsername = new jsdom.JSDOM(stat['username']);
        let username = domUsername.window.document.querySelector("a").textContent;

        let exp_since_death = stat['exp_since_death']
        let weekly_ts = stat['weekly_ts']
        let all_time_ts = stat['all_time_ts']

        let daily_tpk = stat['daily_tpk']
        let weekly_tpk = stat['weekly_tpk']
        let all_time_tpk = stat['all_time_tpk']

        const embedRecord = new MessageEmbed()
            .setTitle(`${username}'s Record`)
            .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)
            .addFields(
                { name: `**EXP Since Death**`, value: `${exp_since_death} EXP`, inline: true },
                { name: `**Weekly TS**`, value: `${weekly_ts} EXP`, inline: true },
                { name: `**⭐ All Time TS**`, value: `${all_time_ts} EXP`, inline: true },
                { name: `**Daily TPK**`, value: daily_tpk, inline: true },
                { name: `**Weekly TPK**`, value: weekly_tpk, inline: true },
                { name: `**⭐ All Time TPK**`, value: all_time_tpk, inline: true }
            )
            .setImage(`https://www.dfprofiler.com/signaturereplicate.php?profile=${survivorID}&imgur=5q7hV6B`)
            .setFooter({ text: `Powered by Ancient Luna`, iconURL: 'https://i.imgur.com/vKo3PJm.png' })
            .setColor('202225')
            .setTimestamp()

        const btnProfile = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setLabel(`See Profile Detail in DF Profiler`)
                    .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)
            )
            .addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setLabel(`Updated Profile Image`)
                    .setURL(`https://www.dfprofiler.com/signaturereplicate.php?profile=${survivorID}&imgur=5q7hV6B.png`)
            )

        loadingTxt.edit({
            content: '⁣',
            embeds: [embedRecord],
            components: [btnProfile],
        }).catch((e) => {});
    })
}

module.exports.help = {
    name: 'record'
}