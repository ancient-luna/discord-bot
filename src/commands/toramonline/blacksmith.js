const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    let blacksmithLV = new MessageEmbed()
        .setTitle("Blacksmith Proficiency Leveling")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`Suggested materials:\n
        ${ar} Lv. 1-10: Shortsword(1) or Adventurer’s garb(5)
        ${ar} Lv. 8-18: Leather Armor(15)
        ${ar} Lv. 15-35: Minotaur Knuckles(30)
        ${ar} Lv. 35-50: Hard Knuckles(45)
        ${ar} Lv. 50-65: Berserker Cestuses / Berserker Blade(60)
        ${ar} Lv. 60-70: Folium Staff / Floral Lance / Phyto Blade (65)
        ${ar} Lv. 70-90: Indigo Sword(85)
        ${ar} Lv. 85-100: Soldier Sword(95)
        ${ar} Lv. 100-120: Fusee Trahison(115) / Holy Robe(120)
        ${ar} Lv. 120-140: Lightning Bolt Spear(135)
        ${ar} Lv. 140-155: Ignis Glaive(155)
        ${ar} Lv. 155-165: Heaven Feather Garb(160)
        ${ar} Lv. 165-170: Red Spider Lily(165)
        ${ar} Lv. 170-175: Indigo Jet Sword(175) / Rilevatore(175)
        ${ar} Lv. 175-185: Bark Mail(180)
        ${ar} Lv. 185-190: Vulture Blade / Vulture Shooter(185)
        ${ar} Lv. 190-195: All Demon Empress Weapons(190)
        ${ar} Lv. 195-200: Arachnid Sword(195) / Arachnid Claws(195)
        ${ar} Lv. 200-205: Demon Empress Garb(200)
        ${ar} Lv. 205+ : Maiden(210)`)
        .setTimestamp()
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })
        .setColor("#2f3136")

    await message.reply({ embeds: [blacksmithLV] });
}

module.exports.help = {
    name: 'blacksmith'
}