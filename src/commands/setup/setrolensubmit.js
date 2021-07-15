const { MessageEmbed, ReactionManager } = require('discord.js');
const { MessageMenu, MessageMenuOption, MessageActionRow } = require('discord-buttons');

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;
    
    const ticketOption = new MessageMenuOption()
        .setLabel("Application")
        .setDescription("Open an application ticket")
        .setEmoji("864810269771300875")
        .setValue("select-ticket")

    const suggestionOption = new MessageMenuOption()
        .setLabel("Feedback")
        .setDescription("Give feedback and suggestion")
        .setEmoji("864810269771300875")
        .setValue("select-suggestion")
    
    const rolesOption = new MessageMenuOption()
        .setLabel("Roles")
        .setDescription("All claimable roles in server")
        .setEmoji("864810269771300875")
        .setValue("select-role")

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

    client.on('clickMenu', async (menu) => {
        if (!menu.channel || !menu.guild || menu.clicker.user.bot) return;

        if (menu.values[0] === 'select-ticket') {
            const embedTicket = new MessageEmbed()
                .setTitle("Open an application ticket")
                .setDescription("**Type** the command `!applyticket` here in <#864556584818835456>")
                .setColor('2f3136')

            menu.reply.send(embedTicket, true);
        }
        
        if (menu.values[0] === 'select-suggestion') {
            const embedSuggestion = new MessageEmbed()
                .setTitle("Give feedback and suggestion")
                .setDescription("**Type** the command `!suggest` followed by the feedback you want to send\n**Example** `!suggest` `ancestor need awake 24/7` here in <#864556584818835456>")
                .setColor('2f3136')

            menu.reply.send(embedSuggestion, true);
        }
        
        if (menu.values[0] === 'select-role') {
            const BlackDesertOnlineEmoji = '<:game_logo_bdo:861579805660151818>';
            const ApexLegendsEmoji = '<:game_logo_apex:861580082418417664>';

            let embedRole = new MessageEmbed()
                .setTitle('All claimable roles in server')
                .setDescription('**React** to any reaction that suits you for the game you love. By this you will unlock the hidden category in this server to meet another fellow seeker in this sanctuary\n\n'
                    + `${BlackDesertOnlineEmoji} <@&856380073745186876> for **Black Desert Online** `
                    + `${ApexLegendsEmoji} <@&861400119101095937> for **Apex Legends**\n\nThe <:game_logo_df:861580085000798229> <@&856379808937410590> role only given to clan members and clan alliances in **Dead Frontier** game. You can apply to get this role by open your application ticket.`)
                .setColor('2f3136')

            menu.reply.send(embedRole, true);
        }
    })
}

module.exports.help = {
    name: 'setrolensubmit'
}