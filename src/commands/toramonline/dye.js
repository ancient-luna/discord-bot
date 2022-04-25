const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    let dye = new MessageEmbed()
        .setTitle("This Month Dye List")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`Monthly Dye is a feature where you can get item drop "weapon and colored shield" by defeating Boss Monsters, on difficulty Nightmare & Ultimate Mode. Every month on first date (1st day) "colored weapons and shields" always change or reset every Boss Monster.`)
        .setTimestamp()
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })
        .setColor("#2f3136")
        
    let table = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Dye list for this month')
                .setURL('https://toram-id.info/dye')
        )

    await message.reply({
        embeds: [dye],
        components: [table]
    });
}

module.exports.help = {
    name: 'dye'
}