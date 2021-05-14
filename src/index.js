require('dotenv').config();

const { Client, MessageEmbed } = require('discord.js');
// eslint-disable-next-line import/order
const util = require('./utils');

const client = new Client({});
const { promisify } = require('util');
const { resolve } = require('path');
const readdir = promisify(require('fs').readdir);

const express = require('express');

const app = express();

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

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(8080);

client.commands = new Map();

client.login(process.env.TOKEN).then(() => {
  util.printLog('info', 'Logging in');
});

client.on('ready', async () => {
  util.printLog('info', `Logged in as ${client.user.tag}!`);
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

  const prefix = process.env.COMMAND_PREFIX;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);
  if (!cmd) return;
  cmd.run(client, message, args);
});

const gatewayChannelId = '839417251470901279';
const rulesChannelId = '838751745815216129';
const luxCastaId = '839210689917616218';

client.on('guildMemberAdd', async (member) => {
  console.log(member);

  const role = member.guild.roles.cache.get(luxCastaId);
  await member.roles.add(role.id).catch((err) => console.log(err));

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
    .setDescription(`The lights get dimmed! <@${member.user.id}> leaving the sanctuary`, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setColor('RED');
  channel.send(embed);
});
