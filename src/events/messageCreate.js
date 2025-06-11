const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ChannelType, ButtonStyle, PermissionsBitField, Collection, AttachmentBuilder } = require("discord.js");

module.exports = new Object({
  name: "messageCreate",
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").Message} message
   */
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
            .setLabel("Get Roles")
            .setURL("https://discord.com/channels/447069790150852609/864556584818835456"),
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Get Guild Tag")
            .setURL("https://discord.gg/XJCtfTPBfu"),
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
          content: `**Welcome <@${message.author.id}>, to the sanctuary of lights**. The <@&${client.config.elderRole}> welcome you as one of true light seekers\n-# <:al_wisdom:1334851144572211240> ${message.author.displayName} has passed the trial by understand our wisdom of lleud to reach this warm sanctuary deeper`,
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

    // PREFIX COMMAND

    const prefix = process.env.COMMAND_PREFIX;

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      if (
        message.guild.members.cache
          .get(client.user.id)
          .permissionsIn(message.channel)
          .has(PermissionsBitField.Flags.SendMessages)
      ) {
        return await message
          .reply({
            embeds: [
              client
                .embed()
                .setDescription(`Prefix is : \`${prefix}\``)
                .setColor(client.color),
            ],
          })
          .catch(() => {});
      }
    }
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
    );
    if (!prefixRegex.test(message.content)) return;
    const [matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
      client.Commands.get(commandName) ||
      client.Commands.get(client.Aliases.get(commandName));
    if (!command) return;

    // Auto Permission Return
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(message.channel)
        .has(PermissionsBitField.Flags.SendMessages)
    )
      return await message.author
        .send({
          content: `${client.emoji.cross} I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`,
        })
        .catch(() => {});
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(message.channel)
        .has(PermissionsBitField.Flags.ViewChannel)
    )
      return;
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(message.channel)
        .has(PermissionsBitField.Flags.EmbedLinks)
    )
      return await message
        .reply({
          content: `${client.emoji.cross} I don't have **\`EMBED_LINKS\`** permission to execute this **\`${command.name}\`** command.`,
        })
        .catch(() => {});

    // Permission for handler
    if (command.permissions) {
      if (command.permissions.client) {
        if (
          !message.guild.members.cache
            .get(client.user.id)
            .permissionsIn(message.channel)
            .has(PermissionsBitField.resolve(command.permissions.client) || [])
        )
          return await client.util.replyOops(
            message,
            `${
              client.emoji.cross
            } I don't have \`${command.permissions.client.join(
              ", "
            )}\` permission(s) to execute this command.`,
            client.color
          );
      }
      if (command.permissions.user) {
        if (
          !message.guild.members.cache
            .get(message.author.id)
            .permissionsIn(message.channel)
            .has(PermissionsBitField.resolve(command.permissions.user) || [])
        )
          return await client.util.replyOops(
            message,
            `${
              client.emoji.cross
            } You don't have \`${command.permissions.user.join(
              ", "
            )}\` permissions to use this command.`,
            client.color
          );
      }
      if (command.permissions.dev) {
        if (client.owners) {
          const findDev = client.owners.find((x) => x === message.author.id);
          if (!findDev)
            return message.reply({
              content: `${client.emoji.cross} Sorry! this cmd on maintenance for now please wait a couple time.`,
            });
        }
      }
    }

    if (command.args) {
      if (!args.length)
        return await client.util.invalidArgs(
          command.name,
          message,
          `Please furnish the demanded arguments.`,
          client
        );
    }

    if (!client.Cooldown.has(command.name)) {
      client.Cooldown.set(command.name, new Collection());
    }

    const cooldown = client.Cooldown.get(command.name);
    let cooldownAmount =
      command.cooldown && command.cooldown > 0 ? command.cooldown * 1000 : 3000;
    if (
      cooldown.has(message.author.id) &&
      !client.owners.includes(message.member.id)
    ) {
      let expiretime = cooldown.get(message.author.id);
      let timeleft = cooldownAmount - (Date.now() - expiretime);

      if (timeleft > 0)
        return await client.util.replyOops(
          message,
          `Please wait for \`[ ${client.util.msToTime(
            timeleft
          )} ]\` before reusing the \`${command.name}\` command!`,
          client.color
        );
    } else {
      cooldown.set(message.author.id, Date.now());
    }

    setTimeout(() => {
      if (cooldown.has(message.author.id))
        return cooldown.delete(message.author.id);
    }, cooldownAmount);

    try {
      await command.execute(client, message, args, prefix);
    } catch (error) {
      const errorButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Devs Contact")
          .setURL("https://discord.com/invite/Sbp2nt8QHe")
      );
      await message
        .reply({
          content: `An unexpected error occured..\n**Please contact devs if it still occurred**`,
          components: [errorButton],
        })
        .catch(() => {});
      console.error(error);
    }
  },
});