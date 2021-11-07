const { MessageEmbed, Client } = require("discord.js");
const { MessageButton } = require("discord-buttons");
const jsdom = require("jsdom");

module.exports.run = async (client, message, args) => {
    const survivorID = args.join(" ");
    if (!survivorID) return message.channel.send("Please specify an ID");

    var request = require('request')

    var option = {
        url: `https://www.dfprofiler.com/profile/json/${survivorID}`,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }

    request(option, function (err, responce, body) {
        var stat = JSON.parse(body)

        const domUsername = new jsdom.JSDOM(stat['username']);
        var username = domUsername.window.document.querySelector("a").textContent;

        var exp_since_death = stat['exp_since_death']
        var weekly_ts = stat['weekly_ts']
        var all_time_ts = stat['all_time_ts']

        var daily_tpk = stat['daily_tpk']
        var weekly_tpk = stat['weekly_tpk']
        var all_time_tpk = stat['all_time_tpk']

        const embedRecord = new MessageEmbed()
            .setTitle(`${username}'s Record`)
            .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)
            .addField(`**EXP Since Death**`, `${exp_since_death} EXP`, true)
            .addField(`**Weekly TS**`, `${weekly_ts} EXP`, true)
            .addField(`**⭐ All Time TS**`, `${all_time_ts} EXP`, true)
            .addField(`**Daily TPK**`, daily_tpk, true)
            .addField(`**Weekly TPK**`, weekly_tpk, true)
            .addField(`**⭐ All Time TPK**`, all_time_tpk, true)
            .setImage(`https://www.dfprofiler.com/signaturereplicate.php?profile=${survivorID}&imgur=5q7hV6B.png`)
            .setFooter(`Powered by Ancient Luna`)
            .setTimestamp()

        const buttonProfile = new MessageButton()
            .setStyle("url")
            .setLabel(`See Profile Detail in DF Profiler`)
            .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)

        const buttonImage = new MessageButton()
            .setStyle("url")
            .setLabel(`Updated Profile Image`)
            .setURL(`https://www.dfprofiler.com/signaturereplicate.php?profile=${survivorID}&imgur=5q7hV6B.png`)

        message.channel.send({
            buttons: [buttonProfile, buttonImage],
            embed: embedRecord
        })
    })
}

module.exports.help = {
    name: 'record'
}