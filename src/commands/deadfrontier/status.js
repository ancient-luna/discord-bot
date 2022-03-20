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
        let stat = JSON.parse(body)

        const domUsername = new jsdom.JSDOM(stat['username']);
        let username = domUsername.window.document.querySelector("a").textContent;

        const domHealth = new jsdom.JSDOM(stat['health']);
        let health = domHealth.window.document.querySelector("div").textContent;

        const domNourishment = new jsdom.JSDOM(stat['nourishment']);
        let nourishment = domNourishment.window.document.querySelector("div").textContent;

        let outpost = stat['outpost']

        let profession_level = stat['profession_level']
        let experience = stat['experience']

        let weekly_ts = stat['weekly_ts']
        let exp_since_death = stat['exp_since_death']

        let daily_tpk = stat['daily_tpk']
        let weekly_tpk = stat['weekly_tpk']
        let pvp_last_hit = stat['pvp_last_hit']

        let cash = stat['cash']
        let bank = stat['bank']

        let tradezone = stat['tradezone']
        let creation_date = stat['creation_date']
        let gm_end = stat['gm_end']
        let gold_member = stat['gold_member']

        let weapon_name_1 = stat['weapon_name_1']
        let weapon_name_2 = stat['weapon_name_2']
        let weapon_name_3 = stat['weapon_name_3']

        let weapon_info_1 = stat['weapon_info_1']
        let weapon_info_2 = stat['weapon_info_2']
        let weapon_info_3 = stat['weapon_info_3']

        let stat_strength = stat['stat_strength']
        let stat_accuracy = stat['stat_accuracy'].split(" ")
        let stat_critical_hit = stat['stat_critical_hit'].split(" ")
        let stat_reloading = stat['stat_reloading'].split(" ")

        let prof_melee = stat['prof_melee']
        let prof_pistols = stat['prof_pistols']
        let prof_rifles = stat['prof_rifles']
        let prof_shotguns = stat['prof_shotguns']
        let prof_machine_guns = stat['prof_machine_guns']
        let prof_explosives = stat['prof_explosives']

        let exp_boost = stat['exp_boost'].split("<\/i> ")
        let dmg_boost = stat['dmg_boost'].split("<\/i> ")
        let speed_boost = stat['speed_boost'].split("<\/i> ")

        try {
            const domArmor = new jsdom.JSDOM(stat['armor']);
            let armor = domArmor.window.document.querySelector("div").textContent;

            let stat_endurance = stat['stat_endurance'].split(" ")
            let stat_agility = stat['stat_agility'].split(" ")

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
                .setFooter({ text: `Powered by Ancient Luna` })
                .setTimestamp()

            message.channel.send({ embeds: [embedEvent] });

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
                embeds: [embed]
            })
        } catch (error) {
            let noArmor = stat['armor']

            let stat_noEndurance = stat['stat_endurance']
            let stat_noAgility = stat['stat_agility']

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
                .setFooter({ text: `Powered by Ancient Luna` })
                .setTimestamp()

            message.channel.send({ embeds: [embedEvent] });

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
                embeds: [embed]
            })
        }
    })
}

module.exports.help = {
    name: 'status'
}