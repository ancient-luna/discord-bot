
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = new Object({
    name: "levatio",
    description: "giving mentioned member levatio role",
    category: "deadfrontier",
    usage: `${client.prefix}levatio <@user>`,
    cooldown: 0,
    aliases: [],
    examples: [],
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
        const lunariaID = '839170815932891197';
        if (!message.member.roles.cache.has(lunariaID)) {
            return message.reply(`**No, you can't**, only the **LUNARIA** able to command me for this.`);
        }

        let target = message.mentions.members.first();
        if (!target) return message.reply('Please `mention` them, the one who is about to be a **Levatio**');

        let role = '1052973235710464040';

        const btnLink = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel(`Clan Vault`)
                    .setURL(`https://discord.com/channels/447069790150852609/875904001340764190`),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel(`CTS/CTL`)
                    .setURL(`https://discord.com/channels/447069790150852609/881836063398723585`)
            )

        message.guild.channels.cache.get('860531645916774401').send({
            content: `**An luna lux vanitas** <@${target.user.id}>,\nMay the lights guide us, so we may bask in its light as true **Levatio**`,
            components: [btnLink]
        }).then(target.roles.add(role)).catch((e) => { });

        await message.delete().catch((e) => { });

        const addDF = new EmbedBuilder()
            .setAuthor({ name: "ROLE ADDED", iconURL: 'https://i.imgur.com/aLkmV4I.png' })
            .setDescription("You have been gived **Levatio** role and have access to all channels ( **[#clan-knowledge](https://discord.com/channels/447069790150852609/884345319389810778) [#clan-vault](https://discord.com/channels/447069790150852609/875904001340764190) [#cts-ctl](https://discord.com/channels/447069790150852609/881836063398723585)** ) as an official member in **Dead Frontier** category. May the lights guide us, so we may bask in its light as true levatios")
            .setTimestamp()
            .setColor(client.config.embedColorTrans)
            .setFooter({ text: "Ancient Luna: We ran as if to meet the moon" })

        const btnAccess = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel(`Go to Meeting Hall`)
                    .setURL(`https://discord.com/channels/447069790150852609/1060992670035619931`)
            )

        await target.user.send({
            embeds: [addDF],
            components: [btnAccess]
        }).catch((e) => { });
    }
})


