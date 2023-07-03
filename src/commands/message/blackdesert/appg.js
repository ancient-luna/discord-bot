
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js");
module.exports = new Object({
    name: "appg",
    description: "appg.",
    category: "Blackdesert",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
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

        const embedApp = new EmbedBuilder()
            .setAuthor({ name: "Ancient Luna Guild Application", iconURL: "https://i.imgur.com/SOCuup9.png" })
            .setDescription(`ℑ𝔱 𝔫𝔢𝔳𝔢𝔯 𝔩𝔢𝔞𝔳𝔢𝔰. ℑ𝔱'𝔰 𝔞𝔩𝔴𝔞𝔶𝔰 𝔱𝔥𝔢𝔯𝔢, 𝔴𝔞𝔱𝔠𝔥𝔦𝔫𝔤, 𝔰𝔱𝔢𝔞𝔡𝔣𝔞𝔰𝔱, 𝔨𝔫𝔬𝔴𝔦𝔫𝔤 𝔲𝔰 𝔦𝔫 𝔬𝔲𝔯 𝔩𝔦𝔤𝔥𝔱 𝔞𝔫𝔡 𝔡𝔞𝔯𝔨 𝔪𝔬𝔪𝔢𝔫𝔱𝔰, 𝔠𝔥𝔞𝔫𝔤𝔦𝔫𝔤 𝔣𝔬𝔯𝔢𝔳𝔢𝔯 𝔞𝔰 𝔴𝔢 𝔡𝔬. 𝔈𝔳𝔢𝔯𝔶 𝔡𝔞𝔶 𝔦𝔱'𝔰 𝔞 𝔡𝔦𝔣𝔣𝔢𝔯𝔢𝔫𝔱 𝔳𝔢𝔯𝔰𝔦𝔬𝔫 𝔬𝔣 𝔦𝔱𝔰𝔢𝔩𝔣. 𝔖𝔬𝔪𝔢𝔱𝔦𝔪𝔢𝔰 𝔴𝔢𝔞𝔨 𝔞𝔫𝔡 𝔴𝔞𝔫, 𝔰𝔬𝔪𝔢𝔱𝔦𝔪𝔢𝔰 𝔰𝔱𝔯𝔬𝔫𝔤 𝔞𝔫𝔡 𝔣𝔲𝔩𝔩 𝔬𝔣 𝔩𝔦𝔤𝔥𝔱𝔰.`)
            .setColor("2b2d31")
            .setImage("https://i.imgur.com/zO7pdYW.png")

        const btnGApp = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("btn-guildapplication")
            .setLabel("Apply for Guild Member")
            .setStyle(ButtonStyle.Primary)
        );

        message.channel.send({
            embeds: [embedApp],
            components: [btnGApp]
        })
    }
})
