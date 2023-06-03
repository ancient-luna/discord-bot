
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = new Object({
    name: "disciple",
    description: "disciple.",
    category: "Blackdesert",
    usage: "",
    cooldown: 0,
    aliases: ['disciple'],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: ['ManageMessages'],
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

        let target = message.mentions.members.first();
        if (!target) return message.reply('Please mention them, the one who is about to be the Lunar Disciple').catch(e => { });
        let role = '1060982357538119850';

        const btnTerms = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("btn-guildterms")
            .setLabel("Guild Terms and Guidelines")
            .setEmoji(":ancientluna_divinare_s:859034096192978965")
            .setStyle(ButtonStyle.Secondary)
        );

        message.guild.channels.cache.get('1060992670035619931').send({
            content: `**We ran as if to meet the moon**,\nA seeker named <@${target.user.id}> become a part of Lunar Disciples`,
            components: [btnTerms]
        }).then(target.roles.add(role)).catch(e => { });

        await message.delete().catch((e) => { });

        const addLD = new EmbedBuilder()
            .setAuthor({ name: "ROLE ADDED", iconURL: "https://i.imgur.com/ejkkWCB.png" })
            .setDescription("You have been gived **Lunar Disciples** role and have access to all channels as an official guild member in **[Ecplise Boarder Hall](https://discord.com/channels/447069790150852609/1060992670035619931)** category. May the lights guide us, so we may bask in its light as a true ancient civilizations")
            .setTimestamp()
            .setColor("2b2d31")
            .setImage("https://i.imgur.com/cNGckVu.png")
            .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })

        const btnAccess = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel(`Go to Sanctum (Guild Member Only Access)`)
                    .setURL(`https://discord.com/channels/447069790150852609/1060992670035619931`)
            )

        await target.user.send({
            embeds: [addLD],
            components: [btnAccess]
        }).catch(e => { });
    }
})
