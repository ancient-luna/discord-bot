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

        const domHealth = new jsdom.JSDOM(stat['health']);
        var health = domHealth.window.document.querySelector("div").textContent;

        const domNourishment = new jsdom.JSDOM(stat['nourishment']);
        var nourishment = domNourishment.window.document.querySelector("div").textContent;

        var outpost = stat['outpost']

        var profession_level = stat['profession_level']
        var experience = stat['experience']

        var weekly_ts = stat['weekly_ts']
        var exp_since_death = stat['exp_since_death']

        var daily_tpk = stat['daily_tpk']
        var weekly_tpk = stat['weekly_tpk']
        var pvp_last_hit = stat['pvp_last_hit']

        var cash = stat['cash']
        var bank = stat['bank']

        var tradezone = stat['tradezone']
        var creation_date = stat['creation_date']
        var gm_end = stat['gm_end']
        var gold_member = stat['gold_member']

        var weapon_name_1 = stat['weapon_name_1']
        var weapon_name_2 = stat['weapon_name_2']
        var weapon_name_3 = stat['weapon_name_3']

        var weapon_info_1 = stat['weapon_info_1']
        var weapon_info_2 = stat['weapon_info_2']
        var weapon_info_3 = stat['weapon_info_3']

        var stat_strength = stat['stat_strength']
        var stat_accuracy = stat['stat_accuracy'].split(" ")
        var stat_critical_hit = stat['stat_critical_hit'].split(" ")
        var stat_reloading = stat['stat_reloading'].split(" ")

        var prof_melee = stat['prof_melee']
        var prof_pistols = stat['prof_pistols']
        var prof_rifles = stat['prof_rifles']
        var prof_shotguns = stat['prof_shotguns']
        var prof_machine_guns = stat['prof_machine_guns']
        var prof_explosives = stat['prof_explosives']

        var exp_boost = stat['exp_boost'].split("<\/i> ")
        var dmg_boost = stat['dmg_boost'].split("<\/i> ")
        var speed_boost = stat['speed_boost'].split("<\/i> ")

        try {
            const domArmor = new jsdom.JSDOM(stat['armor']);
            var armor = domArmor.window.document.querySelector("div").textContent;

            var stat_endurance = stat['stat_endurance'].split(" ")
            var stat_agility = stat['stat_agility'].split(" ")

            const embedEvent = new MessageEmbed()
                .setDescription(`**${weekly_ts} EXP**\n↳ gained and counted while doing TS on this week ⁣ ⁣ ⁣ ⁣ ⁣\n**EXP Since Death** : ${exp_since_death} EXP`)
                .setThumbnail(`https://i.imgur.com/ulP4oAd.png`)
                .addField(`**Daily TPK**`, daily_tpk, true)
                .addField(`**Weekly TPK**`, weekly_tpk, true)
                .addField(`**Last Hit By**`, pvp_last_hit, true)

            const embed = new MessageEmbed()
                .setTitle(`${username}`)
                .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)
                .setDescription(`**${profession_level}** ${experience}`)
                .addField(`**Account Creation**`, creation_date, true)
                .addField(`**GM End Date**`, gm_end, true)
                .addField(`**Gold Member**`, gold_member, true)
                .addField(`**Cash**`, cash, true)
                .addField(`**Bank**`, bank, true)
                .addField(`**Trade Zone**`, tradezone, true)
                .addField(`**Health**`, health, true)
                .addField(`**Nourishment**`, nourishment, true)
                .addField(`**Outpost**`, outpost, true)
                .addField(`**Primary Weapon**`, `${weapon_name_1}\n${weapon_info_1}`, true)
                .addField(`**Secondary Weapon**`, `${weapon_name_2}\n${weapon_info_2}`, true)
                .addField(`**Tertiary Weapon**`, `${weapon_name_3}\n${weapon_info_3}`, true)
                .addField(`**Stats**`, `Strength: ${stat_strength}\nEndurance: ${stat_endurance[0]}\nAgility: ${stat_agility[0]}\nAccuracy: ${stat_accuracy[0]}\nCritical: ${stat_critical_hit[0]}\nReloading: ${stat_reloading[0]}`, true)
                .addField(`**Proficiencies**`, `Melee: ${prof_melee}\nPistols: ${prof_pistols}\nRifles: ${prof_rifles}\nShotguns: ${prof_shotguns}\nMachineguns: ${prof_machine_guns}\nExplosives: ${prof_explosives}`, true)
                .addField(`**Armor**`, armor, true)
                .addField(`**+50% Exp Boost**`, exp_boost[1], true)
                .addField(`**+35% Damage Boost**`, dmg_boost[1], true)
                .addField(`**+35% Speed Boost**`, speed_boost[1], true)
                .setImage(`https://i.imgur.com/TMI3wTd.gif`)
                .setFooter(`Powered by Ancient Luna`)
                .setTimestamp()

            message.channel.send(embedEvent);

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
                embed: embed
            })
        } catch (error) {
            var noArmor = stat['armor']

            var stat_noEndurance = stat['stat_endurance']
            var stat_noAgility = stat['stat_agility']

            const embedEvent = new MessageEmbed()
                .setDescription(`**${weekly_ts} EXP**\n↳ gained and counted while doing TS on this week ⁣ ⁣ ⁣ ⁣ ⁣\n**EXP Since Death** : ${exp_since_death} EXP`)
                .setThumbnail(`https://i.imgur.com/ulP4oAd.png`)
                .addField(`**Daily TPK**`, daily_tpk, true)
                .addField(`**Weekly TPK**`, weekly_tpk, true)
                .addField(`**Last Hit By**`, pvp_last_hit, true)

            const embed = new MessageEmbed()
                .setTitle(`${username}`)
                .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)
                .setDescription(`**${profession_level}** ${experience}`)
                .addField(`**Account Creation**`, creation_date, true)
                .addField(`**GM End Date**`, gm_end, true)
                .addField(`**Gold Member**`, gold_member, true)
                .addField(`**Cash**`, cash, true)
                .addField(`**Bank**`, bank, true)
                .addField(`**Trade Zone**`, tradezone, true)
                .addField(`**Health**`, health, true)
                .addField(`**Nourishment**`, nourishment, true)
                .addField(`**Outpost**`, outpost, true)
                .addField(`**Primary Weapon**`, `${weapon_name_1}\n${weapon_info_1}`, true)
                .addField(`**Secondary Weapon**`, `${weapon_name_2}\n${weapon_info_2}`, true)
                .addField(`**Tertiary Weapon**`, `${weapon_name_3}\n${weapon_info_3}`, true)
                .addField(`**Stats**`, `Strength: ${stat_strength}\nEndurance: ${stat_noEndurance}\nAgility: ${stat_noAgility}\nAccuracy: ${stat_accuracy[0]}\nCritical: ${stat_critical_hit[0]}\nReloading: ${stat_reloading[0]}`, true)
                .addField(`**Proficiencies**`, `Melee: ${prof_melee}\nPistols: ${prof_pistols}\nRifles: ${prof_rifles}\nShotguns: ${prof_shotguns}\nMachineguns: ${prof_machine_guns}\nExplosives: ${prof_explosives}`, true)
                .addField(`**Armor**`, noArmor, true)
                .addField(`**+50% Exp Boost**`, exp_boost[1], true)
                .addField(`**+35% Damage Boost**`, dmg_boost[1], true)
                .addField(`**+35% Speed Boost**`, speed_boost[1], true)
                .setImage(`https://i.imgur.com/TMI3wTd.gif`)
                .setFooter(`Powered by Ancient Luna`)
                .setTimestamp()

            message.channel.send(embedEvent);

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
                embed: embed
            })
        }
    })
}

module.exports.help = {
    name: 'status'
}