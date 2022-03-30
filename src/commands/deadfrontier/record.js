const { MessageEmbed, Client } = require("discord.js");
const { MessageButton } = require("discord.js");
const jsdom = require("jsdom");

module.exports.run = async (client, message, args) => {
    const survivorID = args.join(" ");
    if (!survivorID) return message.channel.send("Please specify an ID");

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
            .addField(`**EXP Since Death**`, `${exp_since_death} EXP`, true)
            .addField(`**Weekly TS**`, `${weekly_ts} EXP`, true)
            .addField(`**⭐ All Time TS**`, `${all_time_ts} EXP`, true)
            .addField(`**Daily TPK**`, daily_tpk, true)
            .addField(`**Weekly TPK**`, weekly_tpk, true)
            .addField(`**⭐ All Time TPK**`, all_time_tpk, true)
            .setImage(`https://www.dfprofiler.com/signaturereplicate.php?profile=${survivorID}&imgur=5q7hV6B`)
            .setFooter({ text: `Powered by Ancient Luna` })
            .setTimestamp()

        const buttonProfile = new MessageButton()
            .setStyle("LINK")
            .setLabel(`See Profile Detail in DF Profiler`)
            .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)

        const buttonImage = new MessageButton()
            .setStyle("LINK")
            .setLabel(`Updated Profile Image`)
            .setURL(`https://www.dfprofiler.com/signaturereplicate.php?profile=${survivorID}&imgur=5q7hV6B.png`)

        message.channel.send({
            buttons: [buttonProfile, buttonImage],
            embeds: [embedRecord]
        })
    })
}

module.exports.help = {
    name: 'record'
}