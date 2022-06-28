const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    let playerLV = new MessageEmbed()
        .setTitle("Leveling Character")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`${ar} Lv. 1-25: Lavarca (Rakau Plains)\n${ar} Lv. 26-37: Shell Mask (Nisel Mountain : Mountainside)\n${ar} Lv. 38-45: Bone Dragonnewt (Ancient Empress Tomb: Area 3)\n${ar} Lv. 56-65: Flare Vlog **Hard** (Fiery Volcano: ar Map)\n${ar} Lv. 66-75: Flare Vlog **Nightmare** (Fiery Volcano: ar Map)\n${ar} Lv. 76-85: Masked Warrior **Hard** (Land Under Cultivation: Hill)\n${ar} Lv. 86-95: Masked Warrior **Nightmare** (Land Under Cultivation: Hill)\n${ar} Lv. 96-105: Don Yeti (Polde Ice Valley)\n${ar} Lv. 106-115: Masked Warrior **Ultimate** (Land Under Cultivation: Hill)\n${ar} Lv. 116-125: Cerberus **Nightmare** (Spring of Rebirth: Top)\n${ar} Lv. 126-130: Lapin The Necromancer (Trace of Dark River)\n${ar} Lv. 131-145: Cerberus **Ultimate** (Spring of Rebirth: Top)\n${ar} Lv. 146-150: Super Death Mushroom (Monster's Forest: Animal Trail)\n${ar} Lv. 151-155: Commander Golem (Lufenas Mansion: Entrance)\n${ar} Lv. 156-165: Venena Coenubia **Hard** (Ultimea Palace: Throne)\n${ar} Lv. 166-175: Venena Coenubia **Nightmare** (Ultimea Palace: Throne)\n${ar} Lv. 176-180: Altoblepas (Rokoko Plains)\n${ar} Lv. 181-199: Venena Coenubia **Ultimate** (Ultimea Palace: Throne)\n${ar} Lv. 200-215: Finstern **Ultimate** (Dark Dragon Shrine: Near the Top)\n${ar} Lv. 216-225: Kuzto **Ultimate** (Labilans Sector: Square)\n${ar} Lv. 226-230: Gravicep **Ultimate** (Recetacula Sector: Depot Rooftop)\n${ar} Lv. 231-235: Arachnidemon **Ultimate** (Arche Valley: Depths)\n${ar} Lv. 236-245: Venena Metacoenubia **Ultimate** (Neo Plastida)\n${ar} Lv. 245-250 Ferzen **Ultimate** (Guardian Forest: Giant Tree)`)
        .setTimestamp()
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })
        .setColor("202225")

    await message.reply({ embeds: [playerLV] }).catch(e => {});
}

module.exports.help = {
    name: 'level',
    aliases: ['leveling']
}