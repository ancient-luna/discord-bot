require('dotenv').config();

const Discord = require('discord.js');

const util = require('./utils');

const client = new Discord.Client();

client.login(process.env.TOKEN).then(() => {
  util.printLog('info', 'Logging in');
});

client.on('ready', async () => {
  util.printLog('info', `Logged in as ${client.user.tag}!`);
});
