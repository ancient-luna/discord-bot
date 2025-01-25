const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const jsdom = require("jsdom");
const axios = require('axios');

module.exports = new Object({
    name: "status",
    description: "status.",
    category: "Deadfrontier",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {

        const survivorID = args.join(" ");
        if (!survivorID) return message.channel.send("Do `!status` `id`");

        const loadingTxt = await message.reply(`Getting player status <a:_util_loading:863317596551118858>`);

        const timestamp = Date.now();

        const option = {
            url: `https://www.dfprofiler.com/profile/json/${survivorID}?_=${timestamp}`,
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        };

        try {
            const response = await axios(option);
            const body = response.data;

            let stat = body;

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
            let stat_dexterity = stat['stat_dexterity']
            let stat_stealth = stat['stat_stealth']

            let prof_melee = stat['prof_melee']
            let prof_pistols = stat['prof_pistols']
            let prof_rifles = stat['prof_rifles']
            let prof_shotguns = stat['prof_shotguns']
            let prof_machine_guns = stat['prof_machine_guns']
            let prof_explosives = stat['prof_explosives']

            let exp_boost = stat['exp_boost'].split("<\/i> ")
            let dmg_boost = stat['dmg_boost'].split("<\/i> ")
            let speed_boost = stat['speed_boost'].split("<\/i> ")

            let exp_boost_ex = stat['exp_boost_ex'].split("<\/i> ")
            let dmg_boost_ex = stat['dmg_boost_ex'].split("<\/i> ")
            let speed_boost_ex = stat['speed_boost_ex'].split("<\/i> ")

            // let position = stat['gpscoords']

            let implant_data = stat['implantslots'];

            const embedEvent = new EmbedBuilder()
                .setTitle(`${username}`)
                .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)
                .setThumbnail(`https://i.imgur.com/ulP4oAd.png`)
                .setDescription(`**${profession_level}**\n(${experience})`)
                .setImage(`https://www.dfprofiler.com/signaturereplicate.php?profile=${survivorID}&imgur=5q7hV6B`)

            const btnProfile = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Dead Frontier Profile")
                        .setURL(`https://fairview.DEADFRONTIER.com/onlinezombiemmo/index.php?action=profile;u=${survivorID}`),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Send Message")
                        .setURL(`https://fairview.DEADFRONTIER.com/onlinezombiemmo/index.php?action=pm;sa=send;u=${survivorID}`),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Trade")
                        .setURL(`https://fairview.DEADFRONTIER.com/onlinezombiemmo/index.php?page=27&memto=${survivorID}`)
                )

            try {

                const domArmor = new jsdom.JSDOM(stat['armor']);
                let armor = domArmor.window.document.querySelector("div").textContent;

                let stat_endurance = stat['stat_endurance'].split(" ")
                let stat_agility = stat['stat_agility'].split(" ")

                // let noArmor = stat['armor']
                // let stat_noEndurance = stat['stat_endurance']
                // let stat_noAgility = stat['stat_agility']

                if (implant_data.trim() !== "") {
                    const domImplant = new jsdom.JSDOM(implant_data);
                    const divElements = domImplant.window.document.querySelectorAll("div");
                    const implant_slots = Array.from(divElements).map((divElement) => {
                        const h4Element = divElement.querySelector("h4");
                        return h4Element ? h4Element.textContent : null;
                    }).filter(Boolean).join(', ');

                    const embed = new EmbedBuilder()
                        .addFields(
                            { name: `**Account Creation**`, value: creation_date, inline: true },
                            { name: `**GM End Date**`, value: gm_end, inline: true },
                            { name: `**Gold Member**`, value: gold_member, inline: true },
                            { name: `**Cash**`, value: cash, inline: true },
                            { name: `**Bank**`, value: bank, inline: true },
                            { name: `**Trade Zone**`, value: tradezone, inline: true },
                            { name: `**Health**`, value: health, inline: true },
                            { name: `**Nourishment**`, value: nourishment, inline: true },
                            { name: `**Last Outpost**`, value: outpost, inline: true },
                            { name: `**Primary Weapon**`, value: `${weapon_name_1}\n${weapon_info_1}`, inline: true },
                            { name: `**Secondary Weapon**`, value: `${weapon_name_2}\n${weapon_info_2}`, inline: true },
                            { name: `**Tertiary Weapon**`, value: `${weapon_name_3}\n${weapon_info_3}`, inline: true },
                            { name: `**Stats**`, value: `Strength: ${stat_strength}\nEndurance: ${stat_endurance[0]}\nAgility: ${stat_agility[0]}\nAccuracy: ${stat_accuracy[0]}\nCritical: ${stat_critical_hit[0]}\nReloading: ${stat_reloading[0]}\nDexterity: ${stat_dexterity}\nStealth: ${stat_stealth}`, inline: true },
                            { name: `**Proficiencies**`, value: `Melee: ${prof_melee}\nPistols: ${prof_pistols}\nRifles: ${prof_rifles}\nShotguns: ${prof_shotguns}\nMachineguns: ${prof_machine_guns}\nExplosives: ${prof_explosives}`, inline: true },
                            { name: `**Armor**`, value: armor, inline: true },
                            { name: `**+50% Exp Boost**`, value: exp_boost[1], inline: true },
                            { name: `**+35% Damage Boost**`, value: dmg_boost[1], inline: true },
                            { name: `**+35% Speed Boost**`, value: speed_boost[1], inline: true },
                            { name: `**+50% Exp EX**`, value: exp_boost_ex[1], inline: true },
                            { name: `**+35% Damage EX**`, value: dmg_boost_ex[1], inline: true },
                            { name: `**+35% Speed EX**`, value: speed_boost_ex[1], inline: true },
                            { name: `**Implants**`, value: `${implant_slots}`, inline: true }
                        )
                        .setImage(`https://i.imgur.com/TMI3wTd.gif`)
                        .setFooter({ text: `Powered by Ancient Luna`, iconURL: 'https://i.imgur.com/vKo3PJm.png' })
                        .setColor('202225')
                        .setTimestamp()

                    loadingTxt.edit({
                        content: '⁣',
                        embeds: [embedEvent, embed],
                        components: [btnProfile]
                    });
                } else {
                    const embed = new EmbedBuilder()
                        .addFields(
                            { name: `**Account Creation**`, value: creation_date, inline: true },
                            { name: `**GM End Date**`, value: gm_end, inline: true },
                            { name: `**Gold Member**`, value: gold_member, inline: true },
                            { name: `**Cash**`, value: cash, inline: true },
                            { name: `**Bank**`, value: bank, inline: true },
                            { name: `**Trade Zone**`, value: tradezone, inline: true },
                            { name: `**Health**`, value: health, inline: true },
                            { name: `**Nourishment**`, value: nourishment, inline: true },
                            { name: `**Last Outpost**`, value: outpost, inline: true },
                            { name: `**Primary Weapon**`, value: `${weapon_name_1}\n${weapon_info_1}`, inline: true },
                            { name: `**Secondary Weapon**`, value: `${weapon_name_2}\n${weapon_info_2}`, inline: true },
                            { name: `**Tertiary Weapon**`, value: `${weapon_name_3}\n${weapon_info_3}`, inline: true },
                            { name: `**Stats**`, value: `Strength: ${stat_strength}\nEndurance: ${stat_endurance[0]}\nAgility: ${stat_agility[0]}\nAccuracy: ${stat_accuracy[0]}\nCritical: ${stat_critical_hit[0]}\nReloading: ${stat_reloading[0]}\nDexterity: ${stat_dexterity}\nStealth: ${stat_stealth}`, inline: true },
                            { name: `**Proficiencies**`, value: `Melee: ${prof_melee}\nPistols: ${prof_pistols}\nRifles: ${prof_rifles}\nShotguns: ${prof_shotguns}\nMachineguns: ${prof_machine_guns}\nExplosives: ${prof_explosives}`, inline: true },
                            { name: `**Armor**`, value: armor, inline: true },
                            { name: `**+50% Exp Boost**`, value: exp_boost[1], inline: true },
                            { name: `**+35% Damage Boost**`, value: dmg_boost[1], inline: true },
                            { name: `**+35% Speed Boost**`, value: speed_boost[1], inline: true },
                            { name: `**+50% Exp EX**`, value: exp_boost_ex[1], inline: true },
                            { name: `**+35% Damage EX**`, value: dmg_boost_ex[1], inline: true },
                            { name: `**+35% Speed EX**`, value: speed_boost_ex[1], inline: true },
                            { name: `**Implants**`, value: `No Implants`, inline: true }
                        )
                        .setImage(`https://i.imgur.com/TMI3wTd.gif`)
                        .setFooter({ text: `Powered by Ancient Luna`, iconURL: 'https://i.imgur.com/vKo3PJm.png' })
                        .setColor('202225')
                        .setTimestamp()

                    loadingTxt.edit({
                        content: '⁣',
                        embeds: [embedEvent, embed],
                        components: [btnProfile]
                    });
                }
            } catch (error) {
                loadingTxt.edit({ content: `This player currently naked (please wear an armor)..\n**unable to send the status now**` })
            }
        } catch (error) {
            console.log(error)
            loadingTxt.edit({
                content: `Something wrong happened..\n**unable to send the status now**`
            });
        }
    }
})