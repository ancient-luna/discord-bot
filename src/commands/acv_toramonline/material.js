const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    const matsMetal = new MessageEmbed()
        .setTitle("Materials Drop List")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`**Metal**\n\nMech Little Boar (Lv. 97)\n*Sykea Deep Valley*\n${ar} Steel Horn (11pts)\n\nBubble Angel (Lv. 143)\n*Shrine of The Gods: Area 2*\n${ar} God stone (15pts)\n${ar} Cracked Halo (16pts)`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setThumbnail("https://i.imgur.com/qOBsDy2.png")
        .setColor("2b2d31")

    const matsCloth = new MessageEmbed()
        .setDescription(`**Cloth**\n\nUnderground Nemico (Lv. 109-111)\n*Ultimea Sewer: South East*\n${ar} Fluffy Scarf (13pts)\n\nCassy (Lv. 47)\n*Ancient Empress Tomb: Area 2*\n${ar} Sheeting Fabric (7pts)\n${ar} Torn Cloth (4pts)\n\nMeditating Potum (Lv. 132)\n*Heresy Corridor*\n${ar} Enlightened Wing (15pts)\n${ar} Torn Apron (13pts)\n\nBubble Angel (Lv. 142/146)\n*Shrine of The Gods: Area 2*\n${ar} Mysterious Cloth (18pts)`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setThumbnail("https://i.imgur.com/kcKsa5L.png")
        .setColor("2b2d31")

    const matsBeast = new MessageEmbed()
        .setDescription(`**Beast**\n\nUnderground Nemico (Lv. 109-111)\n*Ultimea Sewer: South East*\n${ar} Bat Ear (11pts)\n\nMech Little Boar (Lv. 99)\n*Skyea Deep Valley*\n${ar} Coarse Beast Fur (9pts) \n\nVenomsch (Lv. 112)\n*Ultimea Sewer: South*\n${ar} Poisonous Needle (10pts)\n${ar} Stout Tongue (15pts) \n\nBaby Finstern (Lv. 154)\n*Dark Dragon Shrine: Upper*\n${ar} Baby Fang (15pts)\n${ar} Shining Tail (17pts) \n\n`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setThumbnail("https://i.imgur.com/ob5ZcZD.png")
        .setColor("2b2d31")

    const matsWood = new MessageEmbed()
        .setDescription(`**Wood**\n\nPlant Machina (Lv. 93)\n*Peligro Landfill*\n${ar} Peligro Wood (12pts)\n${ar} Contaminated wood (9pts)\n\nLeaf Ghost (Lv. 133)\n*Curonne Forest: North Area 1*\n${ar} White Wood (14pts)\n${ar} White Tree Branch (14pts)\n\nCorroded Floragonet (Lv. 163)\n*Fractum Sector: Area 3*\n${ar} Horn-Like Bud (15pts)\n${ar} Corroded Stem (18pts)\n${ar} Mutated Plant Thorn (16pts)\n\nIvy (Lv. 152)\n*Dark Dragon Shrine: Upper*\n${ar} Ivy Vine (16pts)\n${ar} Young Thick Branch (18pts)\n${ar} Spiky Arrow (70pts)\n\nMonstletoe (Lv. 152)\n*Altoale Sector*\n${ar} Dried Leaf (15pts)\n${ar} Parasitic Plant Seed (19pts)\n${ar} Vampire Root (17pts)\n${ar} Tree Talisman (75pts)`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setThumbnail("https://i.imgur.com/WaPuz3N.png")
        .setColor("2b2d31")

    const matsMedicine = new MessageEmbed()
        .setDescription(`**Medicine**\n\nGrape Jelly (Lv. 110)\n*Ultimea Sewer: South East*\n${ar} Sour-sweet Liquid (13pts)\n${ar} Red Purple Gelatin (15pts)\n\nAcernix (Lv. 135)\n*Garden of Ice and Snow: Area 1*\n${ar} Crushed Ice (16pts)\n${ar} Broken Ice Piller (14pts)\n\nWeltacle (Lv. 168 - Lv. 170)\n*Recetacula Sector: Area 3*\n${ar} Grape Juice (17pts)\n${ar} Poison Needle arrow (85pts)\n${ar} Poison Bubbles (16pts)`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setThumbnail("https://i.imgur.com/zJggy6R.png")
        .setColor("2b2d31")

    const matsMana = new MessageEmbed()
        .setDescription(`**Mana**\n\nCassy (Lv. 47)\n*Ancient Empress Tomb: Area 2*\n${ar} Fairy peace (25pts)\n${ar} Spiritual gemstone (2pts)\n\nCorroded Floragonet (Lv. 163)\n*Fractum Sector: Area 3*\n${ar} Flugel (75pts)\n\nWandering Blood Crystal (Lv. 168)\n*Avant Plastida: Area 3*\n${ar} Aquarator (80pts)\n${ar} Bloody Red Gemstone (5pts)`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setThumbnail("https://i.imgur.com/X7Q44x1.png")
        .setColor("2b2d31")

    const matsSummerShell = new MessageEmbed()
        .setDescription(`**Mana (Summer Shell)**\n\nVenomsch (Lv. 112)\n*Ultimea Sewer: South*\n${ar} Summer Shell (10pts)\n\nBubble Angel (Blue) (Lv. 143)\n*Shrine of The Gods: Area 1*\n${ar}Summer Shell (10pts)`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setThumbnail("https://i.imgur.com/J3N1EF7.png")
        .setColor("2b2d31")
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })

    message.reply({ embeds: [matsMetal] }).catch((e) => {});
    message.channel.send({ embeds: [matsCloth, matsBeast] }).catch((e) => {});
    message.channel.send({ embeds: [matsWood, matsMedicine] }).catch((e) => {});
    message.channel.send({ embeds: [matsMana, matsSummerShell] }).catch((e) => {});
}

module.exports.help = {
    name: 'material',
    aliases: ['mats', 'materials']
}