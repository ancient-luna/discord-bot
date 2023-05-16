const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    let blacksmithLV = new MessageEmbed()
        .setTitle("Blacksmith Proficiency Leveling")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`__**FULL TECH**__\nSuggested materials:\n\n${ar} Lv. 1-8: Shortsword (1)\n${ar} Lv. 8-140: Lightning Bolt Spear (135)\n${ar} Lv. 140-170: Red Spider Lily (165)\n${ar} Lv. 170-190: Bark Mail (180) / Vulture Blade or Vulture Shooter (185)\n${ar} Lv. 190-195: All Demon Empress Weapons (190)\n${ar} Lv. 195-200: Arachni Sword or Arachni Claw (195)\n${ar} Lv. 200-205: Demon Empreess Grab (200)\n${ar} Lv. 205-220+ Maiden (120)`)
        .setTimestamp()
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })
        .setColor("2b2d31")

    await message.reply({ embeds: [blacksmithLV] }).catch((e) => {});
}

module.exports.help = {
    name: 'blacksmith'
}