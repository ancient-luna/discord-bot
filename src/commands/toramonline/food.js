const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (Client, message, args) => {

    const food1 = new MessageEmbed()
        .setTitle("Food Buff List")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .addFields(
            { name: 'STR', value: `*Okaka Rice Ball*`, inline: true },
            { name: 'DEX', value: `*Salmon Rice Ball*`, inline: true },
            { name: 'AGI', value: `*Mentaiko Rice Ball*`, inline: true },
            { name: 'VIT', value: `*Tuna Mayo Rice Ball*`, inline: true },
            { name: 'INT', value: `*Umeboshi Rice Ball*`, inline: true },
            { name: 'Accuracy', value: `*Shoyu Ramen*`, inline: true },
            { name: 'Dodge', value: `*Shio Ramen*`, inline: true },
            { name: 'DEF', value: `*Tonkotsu Ramen*`, inline: true },
            { name: 'MDEF', value: `*Miso Ramen*`, inline: true },
            { name: 'MATK', value: `*Seafood Pizza*`, inline: true },
            { name: 'ATK', value: `*Pizza Davola*`, inline: true },
            { name: 'Weapon ATK', value: `*Pizza Margherita*`, inline: true },
            { name: 'Critical Rate', value: `*Takoyaki*`, inline: true },
            { name: 'AMPR', value: `*Yakisoba*`, inline: true },
            { name: 'MaxMP', value: `*Ankake Fried Rice*`, inline: true },
            { name: '+Aggro', value: `*Beef Stew*`, inline: true },
            { name: '-Aggro', value: `*White Stew*`, inline: true },
            { name: 'MaxHP', value: `*Golden Stir Fry*`, inline: true }
        )
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setColor("202225")

    const food2 = new MessageEmbed()
        .addFields(
            { name: 'EXP Gain', value: `*Chocolate Parfait*`, inline: true },
            { name: 'Drop Rate', value: `*Fruit Parfait*`, inline: true },
            { name: 'DTE Fire', value: `*Bolognese*`, inline: true },
            { name: 'DTE Earth', value: `*Genovese*`, inline: true },
            { name: 'DTE Water', value: `*Vongole*`, inline: true },
            { name: 'DTE Wind', value: `*Naproritan*`, inline: true },
            { name: 'DTE Light', value: `*Carbonara*`, inline: true },
            { name: 'DTE Dark', value: `*Squid Ink Pasta*`, inline: true },
            { name: 'DTE Neutral', value: `*Peperoncio*`, inline: true }
        )
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setColor("202225")

    const food3 = new MessageEmbed()
        .addFields(
            { name: 'P. Resistance', value: `*Beef Burger*`, inline: true },
            { name: 'M. Resistance', value: `*Fish Burger*`, inline: true },
            { name: 'Fire Resistance', value: `*Sunny Side Up Toast*`, inline: true },
            { name: 'Earth Resistance', value: `*Pudding Toast*`, inline: true },
            { name: 'Water Resistance', value: `*Anchovy Toast*`, inline: true },
            { name: 'Wind Resistance', value: `*Cheese Toast*`, inline: true },
            { name: 'Light Resistance', value: `*Honey Toast*`, inline: true },
            { name: 'Dark Resistance', value: `*Garlic Toast*`, inline: true },
            { name: 'Neutral Resistance', value: `*Vanilla TOast*`, inline: true },
            { name: 'P. Barrier', value: `*Chocolate Cake*`, inline: true },
            { name: 'M. Barrier', value: `*Cheese Cake*`, inline: true },
            { name: 'Fractional Barrier', value: `*Pancake*`, inline: true }
        )
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setTimestamp()
        .setColor("202225")
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })

    let detailFood = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Food Buff Details')
                .setURL('https://coryn.club/food.php')
        )
    
    message.reply({
        embeds: [food1, food2, food3],
        components: [detailFood]
    }).catch(e => {});
}

module.exports.help = {
    name: 'food',
    aliases: ['foodbuff', 'buff', 'buffland', 'cook']
}