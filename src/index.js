require('dotenv').config();

const { Client, MessageEmbed } = require('discord.js');

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const { promisify } = require('util');
const { resolve } = require('path');
const readdir = promisify(require('fs').readdir);

const express = require('express');

const util = require('./utils');

const configFile = require('./config/index');

const fetch = require('node-fetch');

require('discord-buttons')(client);

let gConfig = {};
let gatewayChannelId = '';
let rulesChannelId = '';
let luxCastaId = '';

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  // eslint-disable-next-line no-restricted-syntax
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

client.commands = new Map();

client.login(process.env.TOKEN).then(() => {
  util.printLog('info', 'Logging in');
});

client.on('ready', async () => {
  util.printLog('info', `Logged in as ${client.user.tag}!`);
  util.printLog('info', 'Loading configuration file...');
  gConfig = configFile.load();
  gatewayChannelId = gConfig.server.gatewayChannel;
  rulesChannelId = gConfig.server.ruleChannel;
  luxCastaId = gConfig.server.memberRole;

  client.user.setActivity("around Inner City", {
    type: "WATCHING"
  })

  // eslint-disable-next-line no-restricted-syntax,no-unused-vars,no-use-before-define
  for await (const f of getFiles('./src/commands')) {
    // eslint-disable-next-line no-useless-catch
    try {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      const properties = require(f);
      client.commands.set(properties.help.name, properties);
    } catch (err) {
      throw err;
    }
  }
});

client.on('message', async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  if (message.channel.id === '848248129346338856') {
    fetch.default(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}`)
      .then(res => res.json())
      .then(data => {
        message.channel.send(data.response)
      })
  }

  const prefix = process.env.COMMAND_PREFIX;

  if (message.content.charAt(0) === prefix) {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (!cmd) return;
    cmd.run(client, message, args, gConfig);
  }

  if (message.channel.id === gConfig.server.ruleChannel && message.channel.id === gConfig.server.suggestionChannel) {
    if (message.content === gConfig.server.onJoinConfig.preMemberTriggerMessage && !message.member.roles.cache.has(gConfig.server.onJoinConfig.preMemberRole)) {
      const ancientLunaEmoji = client.emojis.find((emoji) => emoji.name === gConfig.server.localEmoji);
      await message.member.roles.add(gConfig.server.memberRole);
      await client.channels.cache.get(gConfig.server.generalChannel).send(
        `<@${message.author.id}> has passed the trial by understand our wisdom of lleud to reach this warm sanctuary deeper. The <@&${gConfig.server.elderRole}> welcome you as one of true light seekers. ${ancientLunaEmoji}`,
      );
    }
    await message.delete();
  }
});

client.on('guildMemberAdd', async (member) => {
  const role = member.guild.roles.cache.get(luxCastaId);
  await member.roles.add(role.id).catch((err) => util.printLog('error', err));

  const channel = member.guild.channels.cache.get(gatewayChannelId);

  const embed = new MessageEmbed()
    .setTitle(`Welcome to ${member.guild.name}`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setDescription(`<@${member.user.id}> please understand our **wisdom of lleud** at ${member.guild.channels.cache.get(rulesChannelId).toString()} as you make your way through this warm sanctuary`)
    .setFooter(`Fellow seeker ${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setColor('7289da');
  channel.send(embed);
});

client.on('guildMemberRemove', async (member) => {
  const channel = member.guild.channels.cache.get(gatewayChannelId);

  const embed = new MessageEmbed()
    .setDescription(`The lights get dimmed! **${member.user.username}#${member.user.discriminator}** leaving the sanctuary`)
    .setFooter(`ID: ${member.user.id} for the lux casta memoir`)
    .setTimestamp()
    .setColor('RED');
  channel.send(embed);
});

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(8080);
