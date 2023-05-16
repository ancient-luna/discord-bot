const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    const normalCryst = new MessageEmbed()
        .setTitle("Crysta List")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`**Normal**\n\nAranea ${ar} Blazingur\nBig corryn ${ar} Seraph machina\nMetal stinger ${ar} Lyark master specialist ${ar} Ageladanios\nCrimsosch ${ar} Amoeba machina\nBrutal dragon decel ${ar} York ${ar} Tuscog ${ar} Black shadow\nGespenst ${ar} Salamander ${ar} Bullamius\nShawle ${ar} Dutannen\nGigant knight ${ar} Volotur\nNurethoth ${ar} Guignol/Nuthoreth\nKing potum ${ar} Platinum potum\nMinotaur ${ar} Rhinosaur\nOdelon machina ${ar} Tappler`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setColor("2b2d31")

    const armourCryst = new MessageEmbed()
        .setDescription(`**Armour**\n\nBoss roga ${ar} Iconos ${ar} Ornlarf ${ar} Sapphire roga ${ar} Ferzen the rock dragon\nCerabes ${ar} Mimesia\nCerberus ${ar} Pyxtica ${ar} Gemma\nColon commander ${ar} Goleps\nTortuga ${ar} Daddy finpen\nDemonic quasar ${ar} Demonic eye\nForestia ${ar} Glaucius\nGopherga ${ar} Yuveria\nIfrid ${ar} Mom fluck\nJade raptor ${ar} Super death mushroom\nNoeliel ${ar} Noeliel the ice statue ${ar} Yule cat\nUsakichi ${ar} Usami ${ar} Usamochi`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setColor("2b2d31")

    const weaponCryst = new MessageEmbed()
        .setDescription(`**Weapon**\n\nBlack Knight of delusion ${ar} Gwaimol ${ar} Hexter\nEvil magic sword ${ar} Blood smeared crystal\nLapin the necromancer ${ar} Bubble bogey\nExcavated golem ${ar} Builder golem\nZahhak machina ${ar} Clawed iron witch\nDemon gate ${ar} Mozto machina ${ar} Pisteus\nEvil crystal beast ${ar} Shampy ${ar} Irestida\nImitacia ${ar} Finstern the dark dragon ${ar} Oculasignio\nGanglef ${ar} Tyrant machina/Giant moon crab ${ar} Vulture\nImitator ${ar} Mardula ${ar} Velum\nMegiston the champion ${ar} Megiston the champion II ${ar} Megiston the champion III ${ar} Megiston the champion IV\nPillar golem ${ar} Ultimate machina ${ar} Vlam the flame dragon\nZolban ${ar} Repthon\nUsasama the necromancer ${ar} Usasama the necromancer II\nZega ${ar} Zega II ${ar} Zega III ${ar} ZegaIV ${ar} Zega V ${ar} Zega VI`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setColor("2b2d31")

    const addCryst = new MessageEmbed()
        .setDescription(`**Additional**\n\nAncient empress ${ar} Ancient empress II\nTwilight dragon ${ar} Baphomela ${ar} Prudent blue shadow\nCandela ${ar} Candela II\nChocolate ooze ${ar} Chocolate ooze II\nHandmade cookie ${ar} Alfenix\nDusk machina ${ar} Trocostida\nEidenliebe ${ar} Garnache\nGolden Iconos ${ar} Felicitoad\nGespenst II ${ar} Stellar ooze\nGiant boar ${ar} Mega alpoca\nGolden skeleton ${ar} Solopy\nGrass dragon yelb ${ar} Wandering wheel ${ar} Gordo\nPumpking ${ar} Jeila ${ar} Zoe ${ar}  Zarth ${ar} Neewollah\nWarmonger ${ar} Proto leon ${ar} King piton\nOx king ${ar} Pillow kitagawa/Royal ox king\nSeltirios ${ar} Tardigrandemon\nYashiro azuki’s dad ${ar} Dark lord`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setColor("2b2d31")

    const specialCryst = new MessageEmbed()
        .setDescription(`**Special**\n\nViscum ${ar} Deniala ${ar} Amalgam ${ar} Chrysmort\nBexiz ${ar} Zelbuse ${ar} War dragon turba\nDark mushroom ${ar} Teertocrit\nEerie crystal ${ar} Tapir ${ar} Patissia\nShining gentleman ${ar} Espectro\nOoze ${ar} Lalvada\nStone mercenary ${ar} Memecoleous\nViolaccoon ${ar} Sand bandits leader\nVenena ${ar} Venena II`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setColor("2b2d31")
        .setTimestamp()
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })

    message.reply({ embeds: [normalCryst] }).catch((e) => {});
    message.channel.send({ embeds: [armourCryst, weaponCryst] }).catch((e) => {});
    message.channel.send({ embeds: [addCryst, specialCryst] }).catch((e) => {});
}

module.exports.help = {
    name: 'crystalist',
    aliases: ['upgradecrysta']
}