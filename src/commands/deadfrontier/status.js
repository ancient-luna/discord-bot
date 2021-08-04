const { MessageEmbed, Client } = require("discord.js");
const { MessageButton } = require("discord-buttons");
const Canvas = require('canvas');
const jsdom = require("jsdom");

var statCanvas = {};

module.exports.run = async (Client, message, args) => {
    const survivorID = args.join(" ");
    if (!survivorID) return message.channel.send("Please specify an ID");

    var request = require('request')

    var option = { 
        url:`https://www.dfprofiler.com/profile/json/${survivorID}`,
        headers: {
            "X-Requested-With" : "XMLHttpRequest"
        }
    }

    request(option, function(err, responce, body) {
        var stat = JSON.parse(body)

        const domUsername = new jsdom.JSDOM(stat['username']);
        var username = domUsername.window.document.querySelector("a").textContent;

        const domClan = new jsdom.JSDOM(stat['clan']);
        var clan = domClan.window.document.querySelector("a").textContent;

        const domHealth = new jsdom.JSDOM(stat['health']);
        var health = domHealth.window.document.querySelector("div").textContent;

        const domNourishment = new jsdom.JSDOM(stat['nourishment']);
        var nourishment = domNourishment.window.document.querySelector("div").textContent;

        const domArmor = new jsdom.JSDOM(stat['armor']);
        var armor = domArmor.window.document.querySelector("div").textContent;
        
        const domInventory = new jsdom.JSDOM(stat['inventory']);
        var inventory = domInventory.window.document.querySelector("div").textContent;
    
        var profession_level = stat['profession_level']
        var experience = stat['experience']
    
        var clan_weekly_ts = stat['clan_weekly_ts']
        var clan_weekly_tpk = stat['clan_weekly_tpk']

        var cash = stat['cash']
        var bank = stat['bank']
    
        var outpost = stat['outpost']
        var tradezone = stat['tradezone']
        var creation_date = stat['creation_date']
        var last_online = stat['last_spawn']
        var gold_member = stat['gold_member']
    
        var weapon_name_1 = stat['weapon_name_1']
        var weapon_name_2 = stat['weapon_name_2']
        var weapon_name_3 = stat['weapon_name_3']
        
        var weapon_info_1 = stat['weapon_info_1']
        var weapon_info_2 = stat['weapon_info_2']
        var weapon_info_3 = stat['weapon_info_3']
    
        var stat_strength = stat['stat_strength']
        var stat_endurance = stat['stat_endurance'].split(" ")
        var stat_agility = stat['stat_agility'].split(" ")
        var stat_accuracy = stat['stat_accuracy'].split(" ")
        var stat_critical_hit = stat['stat_critical_hit'].split(" ")
        var stat_reloading = stat['stat_reloading'].split(" ")
    
        var prof_melee = stat['prof_melee']
        var prof_pistols = stat['prof_pistols']
        var prof_rifles = stat['prof_rifles']
        var prof_shotguns = stat['prof_shotguns']
        var prof_machine_guns = stat['prof_machine_guns']
        var prof_explosives = stat['prof_explosives']
    
        const embed = new MessageEmbed()
            .setTitle(username)
            .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)
            .setDescription(`
                ${clan_weekly_ts}
            `)
            .setFooter(`Powered by Ancient Luna`)
            .setTimestamp()
    
        message.channel.send(embed);
    })
}

module.exports.help = {
    name: 'status'
}