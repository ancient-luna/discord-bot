const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const client = require("../../../..");
module.exports = new Object({
    name: "disciple",
    description: "giving mentioned member lunar disciple role",
    category: "blackdesert",
    usage: `disciple <@user>`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: { client: [], user: [], dev: false, },
    player: { voice: false, active: false, dj: false, },
    
    async execute(client, message, args) {
        const guildEldersID = '1235965537326993450';
        if (!message.member.roles.cache.has(guildEldersID)) {
            return message.reply(`**No, you can't**. only the **Guild Elders** able to command me for this.`);
        }

        let target = message.mentions.members.first();
        if (!target) return message.reply('Please `mention` them, the one who is about to be the **Lunar Disciple** <:al_bs:1334859889155117116>');

        let role = '1060982357538119850';

        const btnTerms = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("btn-guildterms")
                    .setLabel("Rules")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("btn-guildbanner")
                    .setLabel("Banner")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setLabel("Join Alliance")
                    .setURL("https://discord.gg/tjdhmd38P5")
                    .setStyle(ButtonStyle.Link),
            )

        message.guild.channels.cache.get('1060992670035619931').send({
            content: `**We ran as if to meet the moon**,\nA seeker named <@${target.user.id}> become a part of **Lunar Disciples** <:al_bs:1334859889155117116>\n-# Don't forget to get more BDO roles in <#1049815440198733895>`,
            components: [btnTerms]
        }).then(target.roles.add(role));

        await message.delete().catch((e) => { });

        const addLD = new EmbedBuilder()
            .setAuthor({ name: "ROLE ADDED", iconURL: "https://i.imgur.com/ejkkWCB.png" })
            .setDescription("You have been gived **Lunar Disciples** role and have access to all channels as an official guild member in **[Ecplise Boarder Hall](https://discord.com/channels/447069790150852609/1060992670035619931)** category. May the lights guide us, so we may bask in its light as a true ancient civilizations\n\n-# Ancient Luna Guild: We ran as if to meet the moon")
            .setTimestamp()
            .setColor(client.config.embedColorTrans)
            .setImage("https://i.imgur.com/UyMobMe.png")

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
        }).catch((e) => { });
    }
})