const { ButtonBuilder, ActionRowBuilder, ChannelType, ButtonStyle} = require("discord.js");

module.exports = new Object({
  name: "messageCreate",
  
  async execute(client, message) {  
    // Setup Role And Rules
    const text = client.config.preMemberTriggerMessage;
    function hasMixedCase(text) {
      return /[a-z]/.test(text) && /[A-Z]/.test(text);
    }

    if (message.channel.id === client.config.ruleChannel || message.channel.id === client.config.confessionChannel) {
      if (
        message.content?.toLowerCase() === text.toLowerCase() &&
        message.member.roles.cache.has(client.config.preMemberRole)
      ) {
        const memberRole = message.guild.roles.cache.get(
          client.config.memberRole
        );
        const preMemberRole = message.guild.roles.cache.get(
          client.config.preMemberRole
        );
        const welcomeButton = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Get more roles here")
            .setURL("https://discord.com/channels/447069790150852609/864556584818835456"),
          new ButtonBuilder()
            .setCustomId("btn-fellowcard")
            .setLabel("Signature")
            .setStyle(ButtonStyle.Primary)
        );
        await message.member.roles.add(memberRole);
        await message.member.roles.remove(preMemberRole);
        const channel = message.member.guild.channels.cache.get(
          client.config.generalChannel
        );
        await channel.send({
          content: `**Welcome <@${message.author.id}>, to the sanctuary of lights**. The <@&${client.config.elderRole}> welcome you as one of true light seekers\n-# ${message.author.displayName} has passed the trial by understand our wisdom of lleud to reach this warm sanctuary deeper <:ico_radiance:1334864373331787827>`,
          components: [welcomeButton],
        });
      }
      if (!message.author.bot) await message.delete().catch((e) => { });;
    }

    if ( message.author.bot || message.webhookId || !message.guild || !message.channel ) return;
    if ( message.channel.type == ChannelType.DM || message.channel.type == ChannelType.GuildForum ) return;
    
    if (message.partial) await message.fetch();
    if (!message.guild) return;
    if (message.author.bot) return;
  },
});