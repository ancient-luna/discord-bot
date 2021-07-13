const { MessageEmbed, ReactionManager } = require('discord.js');
const { MessageMenu, MessageMenuOption, MessageActionRow } = require('discord-buttons');

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;
    
    const ticketOption = new MessageMenuOption()
        .setLabel("Application")
        .setEmoji("🔓")
        .setValue("select-ticket")

    const suggestionOption = new MessageMenuOption()
        .setLabel("Feedback")
        .setEmoji("📝")
        .setValue("select-suggestion")
    
    const rolesOption = new MessageMenuOption()
        .setLabel("Roles")
        .setEmoji("🎮")
        .setValue("select-roles")

    const dropDownMenu = new MessageMenu()
        .setID("dropdown-menu")
        .setPlaceholder("How to submit and get ...")
        .addOption(ticketOption)
        .addOption(suggestionOption)
        .addOption(rolesOption)

    const MenuActionRow = new MessageActionRow()
        .addComponent(dropDownMenu)

    const embedDDM = new MessageEmbed()
        .setTitle("Ancient Luna Divinare Deity")
        .setDescription("???")
        .setFooter("ilove that i love")

    message.channel.send(embedDDM, { components: [MenuActionRow] });
    
    message.delete()

    client.on('clickMenu', async (menu) => {
        if (!menu.channel || !menu.guild || menu.clicker.user.bot) return;

        if (menu.values[0] === 'select-ticket') {
            const embed = new MessageEmbed()
                .setTitle("Open an application ticket")
                .setDescription("**Type** the command `!applyticket` here in <#842069549675184189>")
                .setColor('2f3136')

            menu.reply.send(embed, true);
        }
        
        if (menu.values[0] === 'select-suggestion') {
            const embed = new MessageEmbed()
                .setTitle("Give feedback and suggestion")
                .setDescription("**Type** the command `!suggest` followed by the feedback you want to send\n**Example** `!suggest` `ancestor need awake 24/7` here in <#842069549675184189>")
                .setColor('2f3136')

            menu.reply.send(embed, true);
        }
        
        if (menu.values[0] === 'select-roles') {
            const channel = '842069549675184189';
            const BlackDesertOnlineRole = message.guild.roles.cache.find(role => role.name === 'Agma')
            const ApexLegendsRole = message.guild.roles.cache.find(role => role.name === 'Apex')

            const BlackDesertOnlineEmoji = '<:game_logo_bdo:861579805660151818>';
            const ApexLegendsEmoji = '<:game_logo_apex:861580082418417664>';

            let embed = new MessageEmbed()
                .setTitle('All claimable roles in server')
                .setDescription('**React** to any reaction that suits you for the game you love. By this you will unlock the hidden category in this server to meet another fellow seeker in this sanctuary\n\n'
                    + `${BlackDesertOnlineEmoji} <@&856380073745186876> for **Black Desert Online** `
                    + `${ApexLegendsEmoji} <@&861400119101095937> for **Apex Legends**\n\nThe <:game_logo_df:861580085000798229> <@&856379808937410590> role only given to clan members and clan alliances in **Dead Frontier** game. You can apply to get this role by open your application ticket.`)
                .setColor('2f3136')

            const messageEmbed = await menu.channel.send(embed, true);

            messageEmbed.react(BlackDesertOnlineEmoji);
            messageEmbed.react(ApexLegendsEmoji);

            setTimeout(() => {
                message.delete()
            }, 5000)
        }
    })

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel.id == channel) {
            const member = await message.guild.members.cache.get(user.id);
            if (!member) return;
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(BlackDesertOnlineRole);
                const addEmbed = new MessageEmbed()
                    .setAuthor("ROLE ADDED", `https://i.imgur.com/etMSX3u.png`)
                    .setDescription(`You have been gived **Agma** role and have access to **Black Desert Online** category`)
                    .setTimestamp()
                    .setColor("GREEN")
                    .setFooter("Ancient Luna")
                member.send(addEmbed)
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ApexLegendsRole);
                const addEmbed = new MessageEmbed()
                    .setAuthor("ROLE ADDED", "https://i.imgur.com/BbW7VAX.png")
                    .setDescription(`You have been gived **Apex** role and have access to **Apex Legends** category`)
                    .setTimestamp()
                    .setColor("GREEN")
                    .setFooter("Ancient Luna")
                member.send(addEmbed)
            }
        } else {
            return;
        }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.message) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel.id == channel) {
            const member = await message.guild.members.cache.get(user.id);
            if (!member) return;
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(BlackDesertOnlineRole);
                const removeEmbed = new MessageEmbed()
                    .setAuthor("ROLE REMOVED", "https://i.imgur.com/etMSX3u.png")
                    .setDescription(`Your **Agma** role were taken away from you since you unreacted and has no longer access to **Black Desert Online** category anymore`)
                    .setTimestamp()
                    .setColor("RED")
                    .setFooter("Ancient Luna")
                member.send(removeEmbed)
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ApexLegendsRole);
                const removeEmbed = new MessageEmbed()
                    .setAuthor("ROLE REMOVED", "https://i.imgur.com/BbW7VAX.png")
                    .setDescription(`Your **Apex** role were taken away from you since you unreacted and has no longer access to **Apex Legends** category anymore`)
                    .setTimestamp()
                    .setColor("RED")
                    .setFooter("Ancient Luna")
                member.send(removeEmbed)
            }
        } else {
            return;
        }
    });
}

module.exports.help = {
    name: 'setrolensubmit'
}