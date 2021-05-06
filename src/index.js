require('dotenv').config();

const { Client } = require('discord.js');

// eslint-disable-next-line import/order
const util = require('./utils');

const client = new Client({});

const { promisify } = require('util');

const { resolve } = require('path');

const readdir = promisify(require('fs').readdir);

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

client.on('guildMemberAdd', async (member) => {
  client.channels.get('839417251470901279').send(`Welcome to the sanctuary of light, fellow seeker <@${member.id}> you are known as lux casta.`);
});

client.on('guildMemberRemove', async (member) => {
  client.channels.get('839417251470901279').send(`<@${member.id}> leaving the sanctuary.`);
});
