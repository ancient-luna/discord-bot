const {
    EmbedBuilder, ButtonBuilder, ActionRowBuilder,
    ChannelType, ButtonStyle, PermissionsBitField, Collection,
} = require("discord.js");
/**
     * @param {import("discord.js").GuildMember} member
     * @param {import("discord.js").messageReaction} reaction
     */
module.exports = new Object({
    name: "messageReactionAdd",
    /**
     * @param {import("../../Eunha")} client 
     * @param {import("discord.js").Message} message
     * @param {import("discord.js").GuildMember} member
     * @param {import("discord.js").messageReaction} reaction
     */
    async execute(client, reaction, user) {

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
    
    if (reaction.message.channel.id === '864556584818835456') {
        if (reaction.emoji.name === 'game_logo_bdo') {
            const channelCity = reaction.message.guild.channels.cache.get(client.config.bdoCityChannel);
            channelCity.send({
                content: `Welcome to the **city of luna** ${reaction.message.guild.members.cache.get(user.id)},\nA journey to seek the true face of the civilizations around the Black Desert awaits you!\n-# Here <#1125365549736665188> application and more BDO roles in <#1049815440198733895>`,
            })
        }
    } else if (reaction.message.channel.id === '1049815440198733895') {
            if (reaction.emoji.name === 'xx_bdo_warhero') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    "𝔗𝔥𝔢𝔯𝔢 𝔦𝔰 𝔞 𝔣𝔦𝔯𝔢 𝔞𝔤𝔞𝔦𝔫𝔰𝔱 𝔲𝔰. 𝔄𝔫𝔡 𝔦𝔫 𝔱𝔥𝔢 𝔢𝔫𝔡, 𝔱𝔥𝔢 𝔣𝔦𝔯𝔢 𝔠𝔬𝔲𝔩𝔡 𝔟𝔲𝔯𝔫 𝔲𝔰, 𝔬𝔯 𝔦𝔤𝔫𝔦𝔱𝔢 𝔲𝔰 𝔦𝔫𝔱𝔬 𝔞𝔫 𝔲𝔫𝔰𝔱𝔬𝔭𝔭𝔞𝔟𝔩𝔢 𝔣𝔬𝔯𝔠𝔢.",
                    "𝔏𝔬𝔬𝔨 𝔲𝔭 𝔱𝔬 𝔶𝔬𝔲𝔯 𝔥𝔢𝔯𝔬𝔢𝔰, 𝔫𝔬𝔱 𝔡𝔬𝔴𝔫 𝔞𝔱 𝔶𝔬𝔲𝔯 𝔥𝔞𝔱𝔢𝔯𝔰.",
                    "𝔇𝔬𝔫'𝔱 𝔴𝔞𝔦𝔱 𝔣𝔬𝔯 𝔞𝔫𝔶 𝔥𝔢𝔯𝔬 𝔱𝔬 𝔰𝔞𝔳𝔢 𝔶𝔬𝔲, 𝔟𝔢𝔠𝔬𝔪𝔢 𝔬𝔫𝔢.",
                    "𝔖𝔬𝔪𝔢𝔱𝔦𝔪𝔢𝔰 𝔱𝔥𝔢 𝔟𝔢𝔰𝔱 𝔥𝔢𝔯𝔬𝔢𝔰 𝔞𝔯𝔢 𝔱𝔥𝔢 𝔬𝔫𝔢𝔰 𝔦𝔫 𝔶𝔬𝔲𝔯 𝔥𝔢𝔞𝔡—𝔟𝔲𝔱 𝔱𝔥𝔞𝔱 𝔡𝔬𝔢𝔰𝔫'𝔱 𝔪𝔞𝔨𝔢 𝔱𝔥𝔢𝔪 𝔞𝔫𝔶 𝔩𝔢𝔰𝔰 𝔯𝔢𝔞𝔩.",
                    "ℑ 𝔡𝔬𝔫’𝔱 𝔩𝔦𝔨𝔢 𝔭𝔢𝔯𝔣𝔢𝔠𝔱 𝔥𝔢𝔯𝔬𝔢𝔰; ℑ 𝔠𝔞𝔫’𝔱 𝔯𝔢𝔠𝔬𝔤𝔫𝔦𝔷𝔢 𝔪𝔶𝔰𝔢𝔩𝔣 𝔦𝔫 𝔱𝔥𝔢𝔪. ℑ 𝔩𝔦𝔨𝔢 𝔣𝔩𝔞𝔴𝔢𝔡 𝔥𝔢𝔯𝔬𝔢𝔰, 𝔩𝔦𝔨𝔢 𝔪𝔢. ℑ 𝔴𝔞𝔫𝔱 𝔱𝔬 𝔰𝔢𝔢 𝔥𝔬𝔴 𝔱𝔥𝔢𝔶 𝔰𝔱𝔯𝔲𝔤𝔤𝔩𝔢 𝔴𝔦𝔱𝔥 𝔱𝔥𝔢𝔦𝔯 𝔣𝔩𝔞𝔴𝔰 𝔞𝔫𝔡 𝔦𝔫 𝔰𝔭𝔦𝔱𝔢 𝔬𝔣 𝔱𝔥𝔞𝔱 𝔪𝔞𝔫𝔞𝔤𝔢 𝔱𝔬 𝔰𝔩𝔞𝔶 𝔱𝔥𝔢 𝔡𝔯𝔞𝔤𝔬𝔫.",
                    "𝔜𝔬𝔲 𝔡𝔬𝔫'𝔱 𝔫𝔢𝔢𝔡 𝔞 𝔪𝔢𝔡𝔞𝔩 𝔱𝔬 𝔡𝔬 𝔴𝔥𝔞𝔱'𝔰 𝔯𝔦𝔤𝔥𝔱.",
                    "ℑ𝔱 𝔦𝔰 𝔟𝔢𝔱𝔱𝔢𝔯 𝔱𝔬 𝔡𝔦𝔢 𝔣𝔬𝔯 𝔶𝔬𝔲𝔯 𝔳𝔦𝔯𝔱𝔲𝔢𝔰 𝔱𝔥𝔞𝔫 𝔱𝔬 𝔩𝔦𝔳𝔢 𝔣𝔬𝔯 𝔶𝔬𝔲𝔯 𝔳𝔦𝔠𝔢𝔰.",
                    "𝔄 𝔡𝔢𝔞𝔡 𝔥𝔢𝔯𝔬 𝔦𝔰 𝔟𝔢𝔱𝔱𝔢𝔯 𝔱𝔥𝔞𝔫 𝔞 𝔩𝔦𝔳𝔦𝔫𝔤 𝔠𝔬𝔴𝔞𝔯𝔡.",
                    "ℑ 𝔴𝔬𝔲𝔩𝔡 𝔯𝔞𝔱𝔥𝔢𝔯 𝔡𝔦𝔢 𝔡𝔬𝔦𝔫𝔤 𝔤𝔬𝔬𝔡 𝔱𝔥𝔞𝔫 𝔩𝔦𝔳𝔢 𝔡𝔬𝔦𝔫𝔤 𝔢𝔳𝔦𝔩.",
                    "ℑ 𝔫𝔢𝔢𝔡𝔢𝔡 𝔞 ℭ𝔥𝔞𝔪𝔭𝔦𝔬𝔫. 𝔖𝔬, ℑ 𝔟𝔢𝔠𝔞𝔪𝔢 𝔬𝔫𝔢!\n𝔉𝔲𝔩𝔣𝔦𝔩𝔩 𝔱𝔥𝔢 𝔯𝔢𝔮𝔲𝔦𝔯𝔢𝔪𝔢𝔫𝔱𝔰 𝔬𝔣 𝔶𝔬𝔲𝔯 𝔬𝔴𝔫 𝔯𝔢𝔮𝔲𝔦𝔯𝔢𝔪𝔢𝔫𝔱𝔰.",
                    "𝔈𝔳𝔢𝔯𝔶 𝔴𝔬𝔯𝔩𝔡 𝔥𝔞𝔰 𝔦𝔱𝔰 𝔳𝔦𝔩𝔩𝔞𝔦𝔫𝔰, 𝔢𝔳𝔢𝔯𝔶 𝔲𝔫𝔦𝔳𝔢𝔯𝔰𝔢 𝔥𝔞𝔰 𝔦𝔱𝔰 𝔰𝔞𝔦𝔫𝔱𝔰, 𝔢𝔳𝔢𝔯𝔶 𝔢𝔯𝔞 𝔥𝔞𝔰 𝔦𝔱𝔰 𝔥𝔢𝔯𝔬𝔢𝔰.",
                    "𝔗𝔥𝔢 𝔪𝔬𝔰𝔱 𝔦𝔪𝔭𝔬𝔯𝔱𝔞𝔫𝔱 𝔥𝔢𝔯𝔬 𝔶𝔬𝔲 𝔪𝔢𝔢𝔱 𝔦𝔫 𝔩𝔦𝔣𝔢 𝔦𝔰 𝔶𝔬𝔲𝔯 𝔥𝔦𝔤𝔥𝔢𝔯 𝔰𝔢𝔩𝔣.",
                    "ℑ 𝔴𝔞𝔰 𝔤𝔦𝔣𝔱𝔢𝔡 𝔩𝔦𝔤𝔥𝔱 𝔣𝔬𝔯 𝔞 𝔯𝔢𝔞𝔰𝔬𝔫... 𝔗𝔥𝔢𝔯𝔢 𝔴𝔦𝔩𝔩 𝔟𝔢 𝔫𝔬 𝔡𝔞𝔯𝔨𝔫𝔢𝔰𝔰 𝔬𝔫 𝔪𝔶 𝔴𝔞𝔱𝔠𝔥."
                ]
                const heroIMG = [
                    'https://64.media.tumblr.com/84bd1c2551d320e728112f4603e2b15b/ff62b61b27ab932c-9d/s500x750/8b6bd9e98aae67f9fb18bf0e72ab18ebbd317b66.gif',
                    'https://64.media.tumblr.com/57ceb28c3f693c3cd899cde576808835/142981d101867ea3-64/s540x810/aebe4f96055aa1ea3d1cd365929a9db5873048d7.gif',
                    'https://64.media.tumblr.com/94f9ceefba73b785492342a93944a570/tumblr_oopqiwBH761vxv9k6o1_500.gif',
                    'https://64.media.tumblr.com/ae2722ebdd9e8abb9d5ca57417262390/tumblr_oopqiwBH761vxv9k6o2_500.gif',
                    'https://64.media.tumblr.com/5b3f243cc3ec931df044f4e719996690/cb9b251ef2f1e048-fe/s500x750/fdb835217c8910c789388ba91faf639fdd37e58b.gif',
                    'https://64.media.tumblr.com/383eabf678356b90fa68dd5e43c967bb/cb9b251ef2f1e048-0c/s500x750/e05fc81676936ed538783d9cc2a2ff343d43c791.gif',
                    'https://64.media.tumblr.com/3d25e7595589c5b5252f09fe50f08ec6/ff62b61b27ab932c-20/s500x750/2b2751ebaf37f2cf2d63520aaf11ad93b8cab1ab.gif',
                    'https://64.media.tumblr.com/461b007eca7f091d50a0b8d63892c14d/c9ad471a7a34b88d-3a/s540x810/e24c94b8cfd469734e73d6486894ebade95a377b.gif',
                    'https://64.media.tumblr.com/4b7237405555b1905724855d7cdea4b5/b702d1c5bcd255e1-e1/s500x750/a35459d1d6a5177d3ebfb258c27a6b44d8c3e227.gif',
                    'https://64.media.tumblr.com/82b50c70789470d34730c2a40be2f865/b99b3dd37ed82b96-10/s540x810/cf013100b99ab0e592c59d6b96fd7993eec77546.gif',
                    'https://64.media.tumblr.com/47fe6279ae0c3e916987ac0b52f20e8d/b99b3dd37ed82b96-0a/s540x810/a3016440d72e068d5ece525ce74fca98106d85a9.gif',
                    'https://64.media.tumblr.com/f845a05adbfcef933590ee0323eaa285/tumblr_pm7af3g6eG1smrz3bo2_540.gif',
                    'https://64.media.tumblr.com/bcc5bd8420d7e2e01d0c008b284c25ed/tumblr_oopqiwBH761vxv9k6o3_500.gif',
                    'https://64.media.tumblr.com/9efc399bf4a413e5bc142e779740a423/b702d1c5bcd255e1-82/s500x750/d975b49d366ab12c97af063ff2d435efe7f4c269.gif',
                    'https://64.media.tumblr.com/15aacdbc35733476954dd231198b45b6/8882843256afa877-4c/s500x750/27cf9d2b75ff34f00623084604d72b81cb2635c9.gif'
                ]
                const heroText = new EmbedBuilder()
                    .setAuthor({ name: "WAR HERO", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setImage(`${heroIMG[Math.floor(Math.random() * heroIMG.length)]}`)
                    .setDescription(`Registered Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# ${quoteText[Math.floor(Math.random() * quoteText.length)]}`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [heroText] });
            }
        
            if (reaction.emoji.name === 'xu_bdo_class_warrior') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔄 𝔰𝔱𝔲𝔯𝔡𝔶 𝔰𝔥𝔦𝔢𝔩𝔡, 𝔞 𝔰𝔥𝔞𝔯𝔭 𝔰𝔴𝔬𝔯𝔡, 𝔞𝔫𝔡 𝔲𝔫𝔴𝔞𝔳𝔢𝔯𝔦𝔫𝔤 𝔠𝔬𝔫𝔳𝔦𝔠𝔱𝔦𝔬𝔫.',
                    '𝔊𝔬𝔶𝔢𝔫, 𝔪𝔶 𝔟𝔯𝔢𝔱𝔥𝔯𝔢𝔫, 𝔴𝔢 𝔰𝔥𝔞𝔩𝔩 𝔠𝔞𝔯𝔯𝔶 𝔬𝔲𝔱 𝔶𝔬𝔲𝔯 𝔴𝔦𝔩𝔩.',
                    '𝔄𝔫 𝔲𝔫𝔣𝔬𝔯𝔤𝔦𝔳𝔦𝔫𝔤 𝔟𝔩𝔞𝔡𝔢. 𝔅𝔬𝔯𝔫 𝔣𝔯𝔬𝔪 𝔞𝔫 𝔦𝔫𝔡𝔬𝔪𝔦𝔱𝔞𝔟𝔩𝔢 𝔴𝔦𝔩𝔩.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/8mhq47l.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Warrior** <:warrior:1258082990031114282>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_ranger') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔡𝔞𝔲𝔤𝔥𝔱𝔢𝔯 𝔬𝔣 𝔱𝔥𝔢 𝔤𝔬𝔡𝔡𝔢𝔰𝔰 𝔖𝔶𝔩𝔳𝔦𝔞, 𝔱𝔥𝔢 𝔤𝔲𝔞𝔯𝔡𝔦𝔞𝔫 𝔬𝔣 𝔎𝔞𝔪𝔞𝔰𝔶𝔩𝔳𝔦𝔞.',
                    '𝔗𝔥𝔢 𝔬𝔫𝔢 𝔴𝔥𝔬 𝔠𝔬𝔪𝔪𝔲𝔫𝔢𝔰 𝔴𝔦𝔱𝔥 𝔰𝔭𝔦𝔯𝔦𝔱𝔰 𝔱𝔬 𝔰𝔲𝔯𝔭𝔞𝔰𝔰 𝔥𝔢𝔯 𝔩𝔦𝔪𝔦𝔱𝔰. 𝔗𝔥𝔢 𝔰𝔱𝔯𝔢𝔫𝔤𝔱𝔥 𝔬𝔣 𝔎𝔞𝔪𝔞𝔰𝔶𝔩𝔳𝔦𝔞 𝔴𝔦𝔩𝔩 𝔰𝔱𝔞𝔫𝔡 𝔳𝔦𝔠𝔱𝔬𝔯𝔦𝔬𝔲𝔰.',
                    '𝔄 𝔰𝔥𝔞𝔯𝔭 𝔰𝔥𝔬𝔱 𝔩𝔢𝔱 𝔩𝔬𝔬𝔰𝔢 𝔣𝔯𝔬𝔪 𝔞 𝔰𝔱𝔢𝔢𝔩 𝔴𝔦𝔩𝔩.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/jLhX7dM.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Ranger** <:ranger:1258082966005878796>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_sorceress') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔬𝔫𝔢 𝔴𝔥𝔬 𝔟𝔯𝔦𝔫𝔤𝔰 𝔡𝔢𝔰𝔱𝔯𝔲𝔠𝔱𝔦𝔬𝔫 𝔱𝔬 𝔞𝔩𝔩 𝔴𝔦𝔱𝔥 𝔡𝔞𝔯𝔨 𝔪𝔞𝔤𝔦𝔠.',
                    '𝔗𝔥𝔢 𝔦𝔪𝔪𝔬𝔯𝔱𝔞𝔩 𝔴𝔦𝔢𝔩𝔡𝔢𝔯 𝔬𝔣 ℭ𝔞𝔯𝔱𝔦𝔞𝔫’𝔰 𝔰𝔠𝔶𝔱𝔥𝔢.',
                    'ℜ𝔢𝔣𝔲𝔰𝔦𝔫𝔤 𝔱𝔥𝔢 𝔣𝔞𝔱𝔢 𝔱𝔥𝔞𝔱 𝔴𝔞𝔰 𝔡𝔢𝔠𝔦𝔡𝔢𝔡 𝔴𝔦𝔱𝔥 𝔱𝔥𝔢 𝔞𝔪𝔲𝔩𝔢𝔱.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "WAR HERO", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/49Nq37M.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Sorceress** <:sorceress:1258082979117273128>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_berserker') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔬𝔲𝔤𝔥 𝔟𝔬𝔡𝔶, 𝔬𝔳𝔢𝔯𝔭𝔬𝔴𝔢𝔯𝔦𝔫𝔤 𝔴𝔦𝔩𝔩.',
                    '𝔒𝔲𝔯 𝔤𝔯𝔢𝔞𝔱 𝔣𝔬𝔯𝔢𝔣𝔞𝔱𝔥𝔢𝔯, 𝔗𝔞𝔫𝔱𝔲, 𝔴𝔦𝔩𝔩 𝔩𝔢𝔞𝔡 𝔲𝔰.',
                    '𝔑𝔞𝔱𝔲𝔯𝔞𝔩 𝔰𝔱𝔯𝔢𝔫𝔤𝔱𝔥 𝔪𝔞𝔵𝔦𝔪𝔦𝔷𝔢𝔡 𝔟𝔶 𝔱𝔥𝔢 𝔴𝔞𝔯𝔯𝔦𝔬𝔯 𝔥𝔦𝔪𝔰𝔢𝔩𝔣.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/MwWEQML.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Berserker** <:berserker:1258082931679821895>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_tamer') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔭𝔯𝔦𝔫𝔠𝔢𝔰𝔰 𝔬𝔣 𝔞 𝔣𝔞𝔩𝔩𝔢𝔫 𝔨𝔦𝔫𝔤𝔡𝔬𝔪 𝔱𝔥𝔞𝔱 𝔣𝔬𝔲𝔫𝔡 𝔣𝔞𝔪𝔦𝔩𝔶 𝔦𝔫 𝔞 𝔪𝔶𝔰𝔱𝔦𝔠𝔞𝔩 𝔟𝔢𝔞𝔰𝔱.',
                    '𝔗𝔯𝔲𝔢 𝔪𝔞𝔰𝔱𝔢𝔯 𝔬𝔣 ℌ𝔢𝔦𝔩𝔞𝔫𝔤, 𝔩𝔢𝔞𝔡𝔰 𝔴𝔦𝔱𝔥 𝔞 𝔭𝔬𝔴𝔢𝔯 𝔱𝔥𝔞𝔱 𝔰𝔥𝔞𝔨𝔢𝔰 𝔱𝔥𝔢 𝔥𝔢𝔞𝔳𝔢𝔫𝔰.',
                    'ℑ𝔫𝔰𝔱𝔦𝔫𝔠𝔱 𝔬𝔫𝔠𝔢 𝔩𝔬𝔰𝔱, 𝔞 𝔰𝔥𝔬𝔯𝔱𝔰𝔴𝔬𝔯𝔡 𝔯𝔢𝔨𝔦𝔫𝔡𝔩𝔢𝔡.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/iJRr8ym.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Tamer** <:tamer:1258082983810826363>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_musa') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔭𝔞𝔱𝔥 𝔬𝔣 𝔱𝔥𝔢 𝔟𝔩𝔞𝔡𝔢 𝔱𝔥𝔞𝔱 𝔠𝔲𝔱𝔰 𝔱𝔥𝔯𝔬𝔲𝔤𝔥 𝔱𝔥𝔢 𝔴𝔦𝔫𝔡.',
                    '𝔈𝔫𝔩𝔦𝔤𝔥𝔱𝔢𝔫𝔢𝔡 𝔟𝔶 𝔱𝔥𝔢 𝔴𝔞𝔶 𝔬𝔣 𝔞 𝔴𝔞𝔯𝔯𝔦𝔬𝔯, 𝔥𝔢 𝔯𝔢𝔱𝔲𝔯𝔫𝔰 𝔞𝔰 𝔞 𝔡𝔢𝔦𝔱𝔶 𝔬𝔣 𝔪𝔞𝔯𝔱𝔦𝔞𝔩 𝔞𝔯𝔱𝔰.',
                    '𝔅𝔯𝔢𝔞𝔨𝔦𝔫𝔤 𝔬𝔲𝔱 𝔬𝔣 𝔱𝔥𝔢 𝔠𝔶𝔠𝔩𝔢 𝔴𝔦𝔱𝔥 𝔞 𝔯𝔢𝔰𝔬𝔩𝔲𝔱𝔢 𝔟𝔩𝔞𝔡𝔢.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/rv1Ynri.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Musa** <:musa:1258082956258447450>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_maehwa') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔄 𝔰𝔥𝔦𝔫𝔦𝔫𝔤 𝔟𝔩𝔞𝔡𝔢 𝔞𝔪𝔬𝔫𝔤 𝔱𝔥𝔢 𝔣𝔞𝔩𝔩𝔦𝔫𝔤 𝔭𝔢𝔱𝔞𝔩𝔰.',
                    '𝔚𝔥𝔢𝔫 𝔱𝔥𝔢 𝔞𝔯𝔱 𝔦𝔰 𝔭𝔢𝔯𝔣𝔢𝔠𝔱𝔢𝔡, 𝔱𝔥𝔢 𝔨𝔢𝔯𝔦𝔰𝔭𝔢𝔞𝔯 𝔴𝔦𝔩𝔩 𝔯𝔢𝔰𝔭𝔬𝔫𝔡.',
                    '𝔗𝔥𝔢 𝔰𝔥𝔞𝔯𝔭𝔢𝔫𝔢𝔡 𝔟𝔩𝔞𝔡𝔢 𝔠𝔞𝔯𝔳𝔢𝔰 𝔞 𝔫𝔢𝔴 𝔡𝔢𝔰𝔱𝔦𝔫𝔶.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/6HZDRtx.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Maehwa** <:maehwa:1258082954245046394>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_valkyrie') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔨𝔫𝔦𝔤𝔥𝔱 𝔬𝔣 𝔈𝔩𝔦𝔬𝔫 𝔲𝔫𝔡𝔢𝔯 ℌ𝔦𝔰 𝔭𝔯𝔬𝔱𝔢𝔠𝔱𝔦𝔬𝔫.',
                    '𝔚𝔦𝔱𝔥 𝔧𝔲𝔰𝔱𝔦𝔠𝔢 𝔦𝔫 𝔶𝔬𝔲𝔯 𝔪𝔦𝔫𝔡, 𝔈𝔩𝔦𝔬𝔫 𝔦𝔫 𝔶𝔬𝔲𝔯 𝔥𝔢𝔞𝔯𝔱, 𝔞𝔫𝔡 𝔳𝔦𝔯𝔱𝔲𝔢𝔰 𝔯𝔢𝔰𝔱𝔦𝔫𝔤 𝔬𝔫 𝔱𝔥𝔢 𝔱𝔦𝔭 𝔬𝔣 𝔶𝔬𝔲𝔯 𝔩𝔞𝔫𝔠𝔦𝔞.',
                    '𝔘𝔫𝔟𝔯𝔢𝔞𝔨𝔞𝔟𝔩𝔢 𝔠𝔬𝔫𝔳𝔦𝔠𝔱𝔦𝔬𝔫 𝔣𝔬𝔯𝔤𝔢𝔡 𝔞𝔱 𝔱𝔥𝔢 𝔢𝔫𝔡 𝔬𝔣 𝔞 𝔰𝔥𝔞𝔯𝔭 𝔟𝔩𝔞𝔡𝔢.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/GyGTUxc.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Valkyrie** <:valkyrie:1258082988525228153>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_kunoichi') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔞𝔰𝔰𝔞𝔰𝔰𝔦𝔫 𝔣𝔯𝔬𝔪 𝔱𝔥𝔢 𝔰𝔥𝔞𝔡𝔬𝔴𝔰.',
                    "ℑ'𝔩𝔩 𝔪𝔞𝔨𝔢 𝔱𝔥𝔢𝔪 𝔭𝔞𝔶 𝔣𝔬𝔯 𝔴𝔥𝔞𝔱 𝔱𝔥𝔢𝔶'𝔳𝔢 𝔡𝔬𝔫𝔢. ℑ 𝔴𝔦𝔩𝔩 𝔫𝔢𝔳𝔢𝔯 𝔰𝔱𝔬𝔭 𝔲𝔫𝔱𝔦𝔩 𝔠𝔯𝔦𝔪𝔰𝔬𝔫 𝔟𝔩𝔬𝔬𝔡 𝔠𝔬𝔳𝔢𝔯𝔰 𝔱𝔥𝔢𝔪 𝔞𝔩𝔩.",
                    '𝔗𝔥𝔢 𝔷𝔢𝔫 𝔢𝔵𝔢𝔠𝔲𝔱𝔦𝔬𝔫𝔢𝔯 𝔬𝔳𝔢𝔯𝔠𝔬𝔪𝔦𝔫𝔤 𝔥𝔢𝔯 𝔱𝔥𝔦𝔯𝔰𝔱 𝔣𝔬𝔯 𝔯𝔢𝔳𝔢𝔫𝔤𝔢.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Kunoichi** <:kunoichi:1258082947555393556>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_ninja') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔞𝔰𝔰𝔞𝔰𝔰𝔦𝔫 𝔴𝔦𝔱𝔥 𝔞 𝔱𝔞𝔯𝔤𝔢𝔱 𝔬𝔫 𝔱𝔥𝔢 𝔟𝔞𝔠𝔨 𝔬𝔣 𝔢𝔳𝔢𝔯𝔶 𝔢𝔫𝔢𝔪𝔶.',
                    '𝔒𝔫 𝔱𝔥𝔢 𝔡𝔞𝔶 𝔴𝔥𝔢𝔫 𝔖𝔲𝔯𝔞 𝔯𝔢𝔱𝔲𝔯𝔫𝔰, 𝔱𝔥𝔢 𝔑𝔞𝔯𝔲𝔰𝔞𝔴𝔞 𝔣𝔩𝔞𝔤 𝔰𝔥𝔞𝔩𝔩 𝔣𝔩𝔶 𝔞𝔤𝔞𝔦𝔫 𝔬𝔫 𝔱𝔥𝔢 𝔣𝔦𝔢𝔩𝔡 𝔬𝔣 𝔟𝔞𝔱𝔱𝔩𝔢.',
                    '𝔗𝔥𝔢 𝔄𝔰𝔰𝔞𝔰𝔰𝔦𝔫 𝔰𝔲𝔯𝔭𝔞𝔰𝔰𝔢𝔰 𝔥𝔦𝔰 𝔩𝔦𝔪𝔦𝔱𝔰 𝔱𝔬 𝔭𝔯𝔬𝔱𝔢𝔠𝔱 𝔱𝔥𝔢 𝔬𝔫𝔢𝔰 𝔥𝔢 𝔩𝔬𝔳𝔢𝔰.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/dLd7J9d.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Ninja** <:ninja:1258082960888954971>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_wizard') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔞𝔭𝔢𝔵 𝔬𝔣 𝔪𝔞𝔤𝔦𝔠𝔞𝔩 𝔞𝔟𝔦𝔩𝔦𝔱𝔶.',
                    '𝔚𝔥𝔢𝔫 𝔟𝔞𝔩𝔞𝔫𝔠𝔢 𝔦𝔰 𝔣𝔬𝔲𝔫𝔡 𝔟𝔢𝔱𝔴𝔢𝔢𝔫 𝔯𝔞𝔤𝔢 𝔞𝔫𝔡 𝔯𝔢𝔞𝔰𝔬𝔫, 𝔥𝔦𝔰 𝔱𝔯𝔲𝔢 𝔭𝔬𝔴𝔢𝔯 ℑ𝔰 𝔟𝔬𝔯𝔫.',
                    "𝔗𝔥𝔢 𝔭𝔯𝔬𝔭𝔥𝔢𝔱 𝔴𝔥𝔬'𝔰 𝔬𝔫𝔠𝔢 𝔞𝔤𝔞𝔦𝔫 𝔱𝔯𝔞𝔫𝔰𝔠𝔢𝔫𝔡𝔢𝔡 𝔥𝔦𝔰 𝔩𝔦𝔪𝔦𝔱𝔰."
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/MX2acTM.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Wizard** <:wizard:1258083206792482938>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_witch') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔤𝔦𝔯𝔩 𝔱𝔥𝔞𝔱 𝔴𝔦𝔢𝔩𝔡𝔰 𝔱𝔥𝔢 𝔭𝔬𝔴𝔢𝔯 𝔬𝔣 𝔱𝔥𝔢 𝔢𝔩𝔢𝔪𝔢𝔫𝔱𝔰.',
                    '𝔖𝔢𝔢𝔨 𝔱𝔥𝔢 𝔱𝔯𝔲𝔱𝔥 𝔴𝔦𝔱𝔥 𝔭𝔲𝔯𝔢 𝔭𝔞𝔰𝔰𝔦𝔬𝔫. 𝔗𝔥𝔢 𝔢𝔩𝔢𝔪𝔢𝔫𝔱𝔞𝔩 𝔩𝔬𝔬𝔨𝔬𝔲𝔱𝔰 𝔴𝔦𝔩𝔩 𝔞𝔫𝔰𝔴𝔢𝔯 𝔶𝔬𝔲𝔯 𝔠𝔞𝔩𝔩.',
                    'ℌ𝔢𝔯 𝔢𝔫𝔡𝔩𝔢𝔰𝔰 𝔡𝔢𝔳𝔬𝔱𝔦𝔬𝔫 𝔱𝔬 𝔯𝔢𝔰𝔢𝔞𝔯𝔠𝔥 𝔥𝔞𝔰 𝔥𝔬𝔫𝔢𝔡 𝔰𝔲𝔠𝔥 𝔴𝔦𝔰𝔡𝔬𝔪'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/5mtNcAc.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Witch** <:witch:1258082992631582741>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_darkknight') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔣𝔩𝔞𝔪𝔢𝔰 𝔟𝔲𝔯𝔫𝔦𝔫𝔤 𝔲𝔫𝔡𝔢𝔯 𝔱𝔥𝔢 𝔪𝔬𝔬𝔫𝔩𝔦𝔤𝔥𝔱.',
                    'ℑ𝔰 𝔱𝔥𝔢𝔯𝔢 𝔞𝔫𝔶𝔱𝔥𝔦𝔫𝔤 𝔞𝔰 𝔟𝔢𝔞𝔲𝔱𝔦𝔣𝔲𝔩 𝔞𝔰 𝔱𝔥𝔢 𝔣𝔩𝔞𝔪𝔢 𝔣𝔯𝔬𝔪 𝔟𝔲𝔯𝔫𝔦𝔫𝔤 𝔰𝔭𝔦𝔯𝔦𝔱 𝔢𝔫𝔢𝔯𝔤𝔶?',
                    '𝔄 𝔖𝔦𝔫𝔤𝔩𝔢 𝔖𝔴𝔬𝔯𝔡 𝔱𝔬 𝔘𝔭𝔥𝔬𝔩𝔡 𝔍𝔲𝔰𝔱𝔦𝔠𝔢'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/LvGgoHJ.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Dark Knight** <:darkknight:1258082936083710013>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_striker') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔖𝔲𝔯𝔭𝔞𝔰𝔰𝔦𝔫𝔤 𝔭𝔥𝔶𝔰𝔦𝔠𝔞𝔩 𝔩𝔦𝔪𝔦𝔱𝔞𝔱𝔦𝔬𝔫𝔰.',
                    '𝔈𝔳𝔢𝔯 𝔣𝔬𝔲𝔤𝔥𝔱 𝔶𝔬𝔲𝔯𝔰𝔢𝔩𝔣 𝔴𝔦𝔱𝔥 𝔶𝔬𝔲𝔯 𝔩𝔦𝔣𝔢 𝔬𝔫 𝔱𝔥𝔢 𝔩𝔦𝔫𝔢?',
                    "𝔗𝔥𝔢 𝔪𝔞𝔯𝔱𝔦𝔞𝔩 𝔞𝔯𝔱𝔦𝔰𝔱 𝔴𝔦𝔱𝔥 𝔞 𝔣𝔢𝔯𝔬𝔠𝔦𝔬𝔲𝔰 𝔟𝔢𝔞𝔰𝔱'𝔰 𝔰𝔭𝔦𝔯𝔦𝔱 𝔴𝔦𝔱𝔥𝔦𝔫."
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/gFcFm1y.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Striker** <:striker:1258083204150202409>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_mystic') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔪𝔞𝔰𝔱𝔢𝔯 𝔬𝔣 𝔪𝔞𝔯𝔱𝔦𝔞𝔩 𝔞𝔯𝔱𝔰 𝔱𝔥𝔞𝔱 𝔰𝔥𝔬𝔬𝔨 𝔱𝔥𝔢 𝔢𝔞𝔯𝔱𝔥 ℑ𝔱𝔰𝔢𝔩𝔣.',
                    '𝔗𝔥𝔢 𝔟𝔩𝔲𝔢 𝔢𝔶𝔢𝔰, 𝔠𝔬𝔫𝔫𝔢𝔠𝔱𝔢𝔡 𝔟𝔶 𝔣𝔞𝔱𝔢, 𝔴𝔦𝔩𝔩 𝔪𝔢𝔢𝔱 𝔞𝔤𝔞𝔦𝔫 𝔦𝔫 𝔅𝔞𝔫𝔥𝔞’𝔰 𝔱𝔢𝔞𝔯𝔰…',
                    'ℜ𝔢𝔪𝔬𝔳𝔦𝔫𝔤 𝔞𝔩𝔩 𝔢𝔪𝔬𝔱𝔦𝔬𝔫 𝔣𝔯𝔬𝔪 𝔥𝔢𝔯 𝔞𝔯𝔱, 𝔰𝔢𝔞𝔩𝔦𝔫𝔤 𝔦𝔱 𝔞𝔩𝔩 𝔦𝔫 𝔬𝔫𝔢 𝔟𝔩𝔬𝔴.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/Xyh2bS8.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Mystic** <:mystic:1258082958540279839>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_archer') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔣𝔬𝔯𝔤𝔬𝔱𝔱𝔢𝔫 𝔰𝔬𝔫 𝔬𝔣 𝔖𝔶𝔩𝔳𝔦𝔞, 𝔭𝔯𝔬𝔱𝔢𝔠𝔱𝔬𝔯 𝔬𝔣 𝔱𝔥𝔢 𝔯𝔢𝔞𝔩𝔪.',
                    '𝔄𝔩𝔩 𝔴𝔥𝔬 𝔱𝔥𝔯𝔢𝔞𝔱𝔢𝔫 𝔱𝔥𝔢 𝔰𝔞𝔠𝔯𝔢𝔡 𝔱𝔯𝔢𝔢 𝔠𝔞𝔫𝔫𝔬𝔱 𝔢𝔰𝔠𝔞𝔭𝔢 𝔱𝔥𝔢 𝔧𝔲𝔰𝔱𝔦𝔠𝔢 𝔬𝔣 𝔪𝔶 𝔟𝔬𝔴.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/FqkNHuN.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Archer** <:archer:1258082929150660750>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_lahn') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔡𝔞𝔫𝔠𝔢 𝔬𝔣 𝔡𝔢𝔞𝔱𝔥 𝔣𝔦𝔩𝔩𝔰 𝔱𝔥𝔢 𝔰𝔨𝔶 𝔴𝔦𝔱𝔥 𝔯𝔢𝔡.',
                    '𝔅𝔩𝔬𝔬𝔡 𝔣𝔬𝔯 𝔟𝔩𝔬𝔬𝔡.',
                    'ℌ𝔦𝔡𝔡𝔢𝔫 𝔟𝔢𝔥𝔦𝔫𝔡 𝔱𝔥𝔢 𝔰𝔭𝔩𝔢𝔫𝔡𝔬𝔯, 𝔞𝔫 𝔲𝔫𝔡𝔦𝔰𝔭𝔲𝔱𝔢𝔡 𝔟𝔩𝔞𝔡𝔢.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/sD0JgWc.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Lahn** <:lahn:1258082949505482906>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_shai') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔖𝔱𝔬𝔭 𝔱𝔥𝔦𝔫𝔨𝔦𝔫𝔤 𝔰𝔬 𝔪𝔲𝔠𝔥. 𝔏𝔢𝔱’𝔰 𝔤𝔬 𝔥𝔞𝔳𝔢 𝔣𝔲𝔫!',
                    "𝔏𝔦𝔰𝔱𝔢𝔫 𝔱𝔬 𝔪𝔶 𝔰𝔬𝔫𝔤𝔰 𝔴𝔥𝔢𝔫 𝔶𝔬𝔲'𝔯𝔢 𝔰𝔠𝔞𝔯𝔢𝔡! 𝔗𝔬𝔬𝔱! 𝔗𝔬𝔬𝔱! 𝔇𝔬 𝔶𝔬𝔲 𝔣𝔢𝔢𝔩 𝔟𝔢𝔱𝔱𝔢𝔯?"
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/GErJhhL.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Shai** <:shai:1258082976961396828>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_guardian') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔲𝔫𝔣𝔬𝔯𝔤𝔦𝔳𝔦𝔫𝔤 𝔧𝔲𝔡𝔦𝔠𝔞𝔱𝔬𝔯 𝔴𝔯𝔞𝔭𝔭𝔢𝔡 𝔦𝔫 𝔱𝔥𝔢 𝔠𝔥𝔦𝔩𝔩 𝔬𝔣 𝔢𝔱𝔢𝔯𝔫𝔞𝔩 𝔴𝔦𝔫𝔱𝔢𝔯.',
                    '𝔗𝔥𝔢 𝔰𝔩𝔞𝔶𝔢𝔯 𝔴𝔥𝔬 𝔯𝔦𝔰𝔢𝔰 𝔬𝔲𝔱 𝔬𝔣 𝔬𝔟𝔩𝔦𝔳𝔦𝔬𝔫 𝔞𝔣𝔱𝔢𝔯 𝔯𝔢𝔠𝔩𝔞𝔦𝔪𝔦𝔫𝔤 𝔱𝔥𝔢 ℌ𝔬𝔩𝔶 𝔉𝔩𝔞𝔪𝔢.',
                    "𝔗𝔥𝔢 𝔟𝔞𝔱𝔱𝔩𝔢 𝔞𝔵𝔢 𝔱𝔥𝔞𝔱 𝔟𝔯𝔢𝔞𝔨𝔰 𝔞𝔩𝔩 𝔬𝔣 𝔱𝔥𝔢 𝔴𝔬𝔯𝔩𝔡'𝔰 𝔰𝔠𝔞𝔩𝔢𝔰."
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/EWbbpT8.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Guardian** <:guardian:1258082942547267665>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_hashashin') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    "𝔗𝔥𝔢 𝔡𝔦𝔳𝔦𝔫𝔢 𝔭𝔲𝔫𝔦𝔰𝔥𝔢𝔯 𝔩𝔢𝔞𝔡𝔦𝔫𝔤 𝔅𝔩𝔞𝔠𝔨𝔰𝔱𝔞𝔯'𝔰 𝔭𝔞𝔯𝔞𝔡𝔦𝔰𝔢.",
                    '𝔒𝔳𝔢𝔯𝔠𝔬𝔪𝔢 𝔱𝔥𝔢 𝔱𝔯𝔦𝔞𝔩𝔰 𝔬𝔣 𝔠𝔬𝔫𝔱𝔢𝔪𝔭𝔱 𝔱𝔬 𝔠𝔬𝔪𝔪𝔞𝔫𝔡 𝔱𝔯𝔲𝔢 𝔞𝔲𝔱𝔥𝔬𝔯𝔦𝔱𝔶 𝔬𝔳𝔢𝔯 𝔱𝔥𝔢 𝔰𝔞𝔫𝔡𝔰.',
                    "𝔖𝔱𝔞𝔫𝔡 𝔣𝔦𝔯𝔪, 𝔬𝔫𝔠𝔢 𝔪𝔬𝔯𝔢, 𝔞𝔱 𝔱𝔥𝔢 𝔴𝔬𝔯𝔩𝔡'𝔰 𝔢𝔫𝔡 𝔞𝔰 𝔱𝔥𝔢 𝔭𝔦𝔢𝔯𝔠𝔦𝔫𝔤 𝔟𝔩𝔞𝔠𝔨 𝔴𝔥𝔦𝔯𝔩𝔴𝔦𝔫𝔡."
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/uMXMYAE.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Hashashin** <:hashashin:1258082945005260942>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_nova') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    "𝔗𝔥𝔢 𝔨𝔦𝔫𝔤𝔡𝔬𝔪 𝔬𝔣 ℭ𝔞𝔩𝔭𝔥𝔢𝔬𝔫'𝔰 𝔩𝔞𝔰𝔱 𝔰𝔱𝔞𝔯 𝔴𝔥𝔬 𝔢𝔪𝔟𝔯𝔞𝔠𝔢𝔰 𝔱𝔥𝔞𝔱 𝔡𝔞𝔯𝔨𝔫𝔢𝔰𝔰 𝔬𝔣 𝔱𝔥𝔢 𝔇𝔦𝔰𝔱𝔬𝔯𝔱𝔢𝔡 𝔊𝔬𝔡𝔡𝔢𝔰𝔰.",
                    '𝔅𝔩𝔬𝔬𝔡𝔶 𝔔𝔲𝔢𝔢𝔫 𝔬𝔣 𝔗𝔥𝔬𝔯𝔫𝔰 𝔬𝔣 𝔱𝔥𝔢 𝔅𝔞𝔱𝔱𝔩𝔢𝔣𝔦𝔢𝔩𝔡',
                    'ℑ 𝔠𝔞𝔩𝔩 𝔲𝔭𝔬𝔫 𝔱𝔥𝔢 𝔎𝔦𝔫𝔤 𝔬𝔣 𝔱𝔥𝔢 𝔇𝔢𝔞𝔡, 𝔞𝔴𝔞𝔨𝔢𝔫 𝔣𝔯𝔬𝔪 𝔶𝔬𝔲𝔯 𝔩𝔬𝔫𝔤 𝔰𝔩𝔲𝔪𝔟𝔢𝔯 𝔞𝔫𝔡 𝔰𝔴𝔢𝔞𝔯 𝔶𝔬𝔲𝔯 𝔩𝔬𝔶𝔞𝔩𝔱𝔶 𝔱𝔬 𝔪𝔢.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/ZKyiFHl.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Nova** <:nova:1258083201969029181>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_sage') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔗𝔥𝔢 𝔄𝔫𝔠𝔦𝔢𝔫𝔱 𝔴𝔥𝔬 𝔞𝔴𝔞𝔦𝔱𝔢𝔡 𝔱𝔥𝔢 𝔢𝔫𝔡 𝔱𝔦𝔪𝔢𝔰 𝔞𝔴𝔞𝔨𝔢𝔫𝔢𝔡 𝔣𝔯𝔬𝔪 𝔱𝔥𝔢 𝔳𝔬𝔦𝔡 𝔬𝔣 𝔢𝔱𝔢𝔯𝔫𝔦𝔱𝔶.',
                    '𝔗𝔥𝔢 𝔩𝔞𝔰𝔱 𝔄𝔫𝔠𝔦𝔢𝔫𝔱 𝔴𝔦𝔢𝔩𝔡𝔰 𝔞 𝔰𝔭𝔢𝔞𝔯 𝔬𝔣 𝔩𝔦𝔤𝔥𝔱𝔫𝔦𝔫𝔤 𝔱𝔬 𝔯𝔢𝔳𝔢𝔯𝔰𝔢 𝔱𝔥𝔢 𝔣𝔞𝔱𝔢 𝔬𝔣 𝔱𝔥𝔢 𝔴𝔬𝔯𝔩𝔡.',
                    'ℌ𝔞𝔳𝔦𝔫𝔤 𝔯𝔢𝔤𝔞𝔦𝔫𝔢𝔡 𝔥𝔦𝔰 𝔩𝔬𝔰𝔱 𝔭𝔬𝔴𝔢𝔯, 𝔥𝔢 𝔥𝔞𝔰 𝔞𝔠𝔥𝔦𝔢𝔳𝔢𝔡 𝔥𝔦𝔰 𝔠𝔬𝔪𝔭𝔩𝔢𝔱𝔢 𝔣𝔬𝔯𝔪.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/53UDmDL.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Sage** <:sage:1258082969562648668>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_corsair') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔚𝔞𝔦𝔱 𝔣𝔬𝔯 𝔪𝔢, 𝔴𝔬𝔯𝔩𝔡! 𝔉𝔬𝔯 ℑ 𝔠𝔩𝔞𝔦𝔪 𝔶𝔢 𝔞𝔰 𝔪𝔢 𝔬𝔴𝔫! ℌ𝔞𝔥𝔞!',
                    '𝔐𝔢 𝔟𝔢𝔩𝔬𝔳𝔢𝔡 𝔠𝔯𝔢𝔴! 𝔉𝔬𝔩𝔩𝔬𝔴 𝔪𝔢 𝔩𝔢𝔞𝔡, 𝔬𝔭𝔢𝔫 𝔣𝔦𝔯𝔢!',
                    'ℜ𝔦𝔡𝔦𝔫𝔤 𝔥𝔢𝔯 𝔡𝔯𝔢𝔞𝔪𝔰 𝔱𝔬 𝔰𝔦𝔫𝔤 𝔣𝔬𝔯𝔱𝔥 𝔞 𝔥𝔲𝔤𝔢 𝔱𝔦𝔡𝔞𝔩 𝔴𝔞𝔳𝔢!'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/zbsHwAB.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Corsair** <:corsair:1258082934154461307>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_drakania') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔒𝔫𝔩𝔶 𝔱𝔥𝔢 𝔡𝔢𝔰𝔱𝔯𝔲𝔠𝔱𝔦𝔬𝔫 𝔬𝔣 𝔱𝔥𝔢 𝔤𝔬𝔡-𝔠𝔬𝔫𝔰𝔲𝔪𝔦𝔫𝔤 𝔣𝔩𝔞𝔪𝔢 𝔴𝔦𝔩𝔩 𝔯𝔢𝔰𝔱𝔬𝔯𝔢 𝔱𝔥𝔢 𝔩𝔬𝔫𝔤-𝔩𝔬𝔰𝔱 𝔭𝔞𝔯𝔞𝔡𝔦𝔰𝔢 𝔬𝔣 𝔡𝔯𝔞𝔤𝔬𝔫𝔰.',
                    '𝔇𝔢𝔰𝔱𝔯𝔲𝔠𝔱𝔦𝔬𝔫 𝔱𝔞𝔨𝔢𝔰 𝔣𝔩𝔦𝔤𝔥𝔱, 𝔦𝔤𝔫𝔦𝔱𝔦𝔫𝔤 𝔱𝔥𝔢 𝔣𝔯𝔬𝔷𝔢𝔫 𝔰𝔨𝔶.',
                    '𝔒𝔲𝔯 𝔥𝔢𝔞𝔯𝔱𝔰 𝔟𝔢𝔞𝔱 𝔞𝔰 𝔬𝔫𝔢 𝔟𝔢𝔶𝔬𝔫𝔡 𝔡𝔢𝔞𝔱𝔥.'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/NzvTRJf.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Drakania** <:drakania:1258082940508700704>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_woosa') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔚𝔦𝔱𝔥 𝔢𝔩𝔢𝔤𝔞𝔫𝔱, 𝔣𝔩𝔲𝔱𝔱𝔢𝔯𝔦𝔫𝔤 𝔟𝔲𝔱𝔱𝔢𝔯𝔣𝔩𝔶 𝔴𝔦𝔫𝔤𝔰, 𝔱𝔥𝔢 𝔚𝔬𝔬𝔡𝔬 𝔖𝔠𝔥𝔬𝔬𝔩’𝔰 𝔇𝔬 𝔴𝔦𝔢𝔩𝔡𝔢𝔯 𝔟𝔯𝔦𝔫𝔤𝔰 𝔣𝔬𝔯𝔱𝔥 𝔱𝔥𝔢 𝔰𝔱𝔬𝔯𝔪𝔰.',
                    '𝔗𝔥𝔢 𝔅𝔲𝔱𝔱𝔢𝔯𝔣𝔩𝔶 𝔬𝔫 𝔱𝔥𝔢 𝔓𝔞𝔱𝔥 𝔱𝔬 𝔈𝔫𝔩𝔦𝔤𝔥𝔱𝔢𝔫𝔪𝔢𝔫𝔱'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/fQc6gVq.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Woosa** <:woosa:1258083034117308528>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_maegu') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔇𝔞𝔯𝔢 𝔫𝔬𝔱 𝔣𝔞𝔩𝔩 𝔦𝔫𝔱𝔬 𝔱𝔥𝔢 𝔱𝔯𝔞𝔭 𝔬𝔣 𝔱𝔥𝔢 𝔞𝔩𝔩𝔲𝔯𝔦𝔫𝔤 𝔣𝔬𝔵 𝔰𝔭𝔦𝔯𝔦𝔱𝔰 𝔠𝔞𝔩𝔩𝔢𝔡 𝔣𝔬𝔯𝔱𝔥 𝔟𝔶 𝔱𝔥𝔢 𝔇𝔬 𝔴𝔦𝔢𝔩𝔡𝔢𝔯 𝔬𝔣 𝔱𝔥𝔢 𝔍𝔴𝔞𝔡𝔬 𝔖𝔠𝔥𝔬𝔬𝔩',
                    '𝔉𝔬𝔵 𝔪𝔞𝔡𝔢 𝔠𝔬𝔪𝔭𝔩𝔢𝔱𝔢 𝔱𝔥𝔯𝔬𝔲𝔤𝔥 𝔞 𝔫𝔢𝔴 𝔭𝔞𝔠𝔱'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/oB319WT.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Maegu** <:maegu:1258082951535657031>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_scholar') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔅𝔯𝔞𝔫𝔡𝔦𝔰𝔥𝔦𝔫𝔤 ℌ𝔞𝔪𝔪𝔢𝔯𝔰 𝔠𝔯𝔞𝔣𝔱𝔢𝔡 𝔦𝔫 𝔢𝔞𝔯𝔱𝔥𝔰 𝔢𝔩𝔢𝔪𝔢𝔫𝔱𝔰, 𝔞 𝔪𝔞𝔰𝔱𝔢𝔯 𝔬𝔣 𝔄𝔩𝔠𝔥𝔢𝔪𝔶',
                    '𝔄 𝔐𝔞𝔳𝔢𝔫 𝔬𝔣 𝔄𝔩𝔠𝔥𝔢𝔪𝔶 𝔱𝔯𝔞𝔫𝔰𝔠𝔢𝔫𝔡𝔦𝔫𝔤 𝔪𝔞𝔱𝔱𝔢𝔯 𝔱𝔥𝔯𝔬𝔲𝔤𝔥 𝔊𝔯𝔞𝔳𝔦𝔱𝔶 ℭ𝔬𝔯𝔢 𝔣𝔲𝔰𝔦𝔬𝔫'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/vdWEFoo.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Scholar** <:scholar:1258082973497167925>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
            if (reaction.emoji.name === 'xu_bdo_class_dosa') {
                const channelArtifact = reaction.message.guild.channels.cache.get(client.config.artifactChannel);
                const quoteText = [
                    '𝔄𝔭𝔭𝔢𝔞𝔯𝔦𝔫𝔤 𝔣𝔯𝔬𝔪 𝔱𝔥𝔢 ℭ𝔩𝔬𝔲𝔡𝔰, 𝔙𝔞𝔫𝔦𝔰𝔥𝔦𝔫𝔤 𝔴𝔦𝔱𝔥 𝔱𝔥𝔢 𝔉𝔬𝔤',
                    '𝔚𝔦𝔱𝔥 𝔖𝔞𝔠𝔯𝔢𝔡 ℜ𝔢𝔩𝔦𝔠𝔰, ℌ𝔢 𝔅𝔢𝔫𝔡𝔰 𝔱𝔥𝔢 ℭ𝔩𝔬𝔲𝔡𝔰 𝔞𝔱 𝔚𝔥𝔦𝔪'
                ]
                const classText = new EmbedBuilder()
                    .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
                    .setFooter({ text: 'Elionian Year' })
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/1aLbsd9.png')
                    .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n-# Ancient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\n-# Chosen Main Class: **Dosa** <:dosa:1258082938105368648>`)
                    .setColor(client.config.embedColorTrans);
                return channelArtifact.send({ embeds: [classText] });
            }
        } else if (reaction.message.channel.id === '1060992992523079800') {
            if (reaction.emoji.name === 'ancientluna_divinare') {
                const channelSanctum = reaction.message.guild.channels.cache.get(client.config.sanctumChannel);
                return channelSanctum.send({ content: `<:ancientluna_divinare:841754250949820416> ${reaction.message.guild.members.cache.get(user.id)} just applied for **Guild Mission Specialist** position this week.` })
            }
        }
    }
})