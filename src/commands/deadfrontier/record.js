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

        var gold_member = stat['gold_member']

        var weekly_ts = stat['weekly_ts']
        var exp_since_death = stat['exp_since_death']

        var daily_tpk = stat['daily_tpk']
        var weekly_tpk = stat['weekly_tpk']
        var pvp_last_hit = stat['pvp_last_hit']

        const embedRecord = new MessageEmbed()
            .setTitle(`${username}'s Weekly Record`)
            .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)
            .addField(`**EXP Since Death**`, `${exp_since_death} EXP`, true)
            .addField(`**Weekly TS**`, `${weekly_ts} EXP`, true)
            .addField(`**Gold Member**`, gold_member, true)
            .addField(`**Daily TPK**`, daily_tpk, true)
            .addField(`**Weekly TPK**`, weekly_tpk, true)
            .addField(`**Last Hit By**`, pvp_last_hit, true)
            .setImage(`https://www.dfprofiler.com/signaturereplicate.php?profile=${survivorID}&imgur=5q7hV6B`)

        const buttonProfile = new MessageButton()
            .setStyle("url")
            .setLabel("Dead Frontier Profile ⁣")
            .setURL(`https://fairview.deadfrontier.com/onlinezombiemmo/index.php?action=profile;u=${survivorID}`)

        const buttonMessage = new MessageButton()
            .setStyle("url")
            .setLabel("Send Message")
            .setURL(`https://fairview.deadfrontier.com/onlinezombiemmo/index.php?action=pm;sa=send;u=${survivorID}`)

        const buttonTrade = new MessageButton()
            .setStyle("url")
            .setLabel("Trade ⁣")
            .setURL(`https://fairview.deadfrontier.com/onlinezombiemmo/index.php?page=27&memto=${survivorID}`)

        message.channel.send({
            buttons: [buttonProfile, buttonMessage, buttonTrade],
            embed: embedRecord
        })
    })
}

module.exports.help = {
    name: 'record'
}