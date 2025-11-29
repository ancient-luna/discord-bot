const { ButtonStyle, PermissionsBitField, Collection, ContainerBuilder, TextDisplayBuilder, MessageFlags, SectionBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  
  async execute(client, message) {

    const starIco = '<:ico_radiance:1334864373331787827>';

    // PREFIX COMMAND
    const prefix = process.env.COMMAND_PREFIX;
    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    const container = new ContainerBuilder();
    const textPrefix = new TextDisplayBuilder().setContent(`Prefix is: \`${prefix}\`\n</help:1388449905483317310> to see what you seek for ${starIco}`);
    container.addTextDisplayComponents(textPrefix);

    if (message.content.match(mention)) {
      if (message.guild.members.cache.get(client.user.id).permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)) {
        return await message.reply({
          flags: MessageFlags.IsComponentsV2,
          components: [container],
        }).catch(() => {});
      }
    }
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.Commands.get(commandName) || client.Commands.get(client.Aliases.get(commandName));
    if (!command) return;

    // Auto Permission Return
    if (!message.guild.members.cache.get(client.user.id).permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages))
      return await message.author.send({
          content: `I don't have \`SEND_MESSAGES\` permission in <#${message.channelId}> to execute this **\`${command.name}\`** command ${starIco}`, 
      }).catch(() => {});
    if (!message.guild.members.cache.get(client.user.id).permissionsIn(message.channel).has(PermissionsBitField.Flags.ViewChannel)) return;
    if (!message.guild.members.cache.get(client.user.id).permissionsIn(message.channel).has(PermissionsBitField.Flags.EmbedLinks))
      return await message.reply({
          content: `I don't have \`EMBED_LINKS\` permission to execute this **\`${command.name}\`** command ${starIco}`,
      }).catch(() => {});

    // Permission for handler
    if (command.permissions) {
      if (command.permissions.client) {
        if (!message.guild.members.cache.get(client.user.id).permissionsIn(message.channel).has(PermissionsBitField.resolve(command.permissions.client) || []))
          return await client.util.replyOops(
            message,
            `I don't have \`${command.permissions.client.join(", ")}\` permission(s) to execute this command ${starIco}`
          );
      }
      if (command.permissions.user) {
        if (!message.guild.members.cache.get(message.author.id).permissionsIn(message.channel).has(PermissionsBitField.resolve(command.permissions.user) || []))
          return await client.util.replyOops(
            message,
            `You don't have \`${command.permissions.user.join(", ")}\` permissions to use this command ${starIco}`
          );
      }
      if (command.permissions.dev) {
        if (client.owners) {
          const findDev = client.owners.find((x) => x === message.author.id);
          if (!findDev) return message.reply({
            content: `Sorry! this cmd on maintenance for now please wait a moment ${starIco}`,
          });
        }
      }
    }

    if (command.args) {
      if (!args.length) return await client.util.invalidArgs(
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
    let cooldownAmount = command.cooldown && command.cooldown > 0 ? command.cooldown * 1000 : 3000;
    if ( cooldown.has(message.author.id) && !(client.owners && client.owners.includes(message.author.id))) {
      let expiretime = cooldown.get(message.author.id);
      let timeleft = cooldownAmount - (Date.now() - expiretime);

      if (timeleft > 0)
        return await client.util.replyOops(
          message,
          `Please wait for \`[ ${client.util.msToTime(timeleft)} ]\` before reusing the \`${command.name}\` command ${starIco}`
        );
    } else {
      cooldown.set(message.author.id, Date.now());
    }

    setTimeout(() => {
      if (cooldown.has(message.author.id)) return cooldown.delete(message.author.id);
    }, cooldownAmount);

    try {
      await command.execute(client, message, args, prefix);
    } catch (error) {
      const container = new ContainerBuilder();
      const textError = new TextDisplayBuilder().setContent(`An unexpected error occurred..\n-# Please contact devs if it still occurred ${starIco}`);
      const section = new SectionBuilder()
        .addTextDisplayComponents(textError)
        .setButtonAccessory(button => button
          .setStyle(ButtonStyle.Link)
          .setLabel("Devs Contact")
          .setURL("https://discord.com/invite/Sbp2nt8QHe")
        );
      container.addSectionComponents(section);
      await message.reply({
        flags: MessageFlags.IsComponentsV2,
        components: [container],
      }).catch(() => {});
      console.error(error);
    }
  },
};