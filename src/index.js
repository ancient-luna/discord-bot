require('dotenv').config();

const { Client, MessageEmbed, Intents} = require('discord.js');

const client = new Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES
  ]
});
const { promisify } = require('util');
const { resolve } = require('path');
const readdir = promisify(require('fs').readdir);

const express = require('express');

const fetch = require('node-fetch');
const schedule = require('node-schedule');
const util = require('./utils');

const configFile = require('./config/index');

let gConfig = {};
let gatewayChannelId = '';
let rulesChannelId = '';
let luxCastaId = '';
let isPlayingAudio = false;

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
  luxCastaId = gConfig.server.onJoinConfig.preMemberRole;

  client.user.setPresence({
    activities: [{
      name: `around el scaro`,
      type: `PLAYING`,
    }],
    status: `online`
  });

  // eslint-disable-next-line no-restricted-syntax,no-unused-vars,no-use-before-define
  for await (const f of getFiles('./src/commands')) {
    // eslint-disable-next-line no-useless-catch
    try {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      const properties = require(f);
      client.commands.set(properties.help.name, properties);
      if(properties.help.aliases) {
        for(let alias of properties.help.aliases) {
          client.commands.set(alias, properties)
        }
      }
    } catch (err) {
      throw err;
    }
  }

  const rule = new schedule.RecurrenceRule();
  rule.hour = 1;

  schedule.scheduleJob(rule, async () => {
    util.printLog('info', 'Running scheduled job');
    const channel = client.channels.cache.get(gConfig.server.voiceChannel);
    const voiceMessage = gConfig.server.voiceMessage;
    if (channel && voiceMessage) {
      if (channel.joinable && channel.speakable) {
        const link = `https://texttospeech.responsivevoice.org/v1/text:synthesize?text=${encodeURIComponent(voiceMessage)}&lang=en-US&key=0POmS5Y2`;

        const connection = await channel.join();
        if (!isPlayingAudio) {
          const dispatcher = connection.play(link);
          dispatcher.on('start', () => {
            util.printLog('info', 'Playing voice');
            isPlayingAudio = true;
          });

          dispatcher.on('finish', () => {
            util.printLog('info', 'Finished playing voice');
            channel.leave();
            isPlayingAudio = false;
          });
          dispatcher.on('error', console.error);
        }
      }
    }
  });
});

client.on('messageCreate', async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  if (message.channel.id === '848248129346338856') {
    fetch.default(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}`)
      .then((res) => res.json())
      .then((data) => {
        message.channel.send(data.response);
      });
  }

  const prefix = process.env.COMMAND_PREFIX;

  if (message.content.charAt(0) === prefix) {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (!cmd) return;
    cmd.run(client, message, args, gConfig);
  }

  // eslint-disable-next-line max-len
  if (message.channel.id === gConfig.server.ruleChannel || message.channel.id === gConfig.server.guidelinesChannel) {
    // eslint-disable-next-line max-len
    if (message.content === gConfig.server.onJoinConfig.preMemberTriggerMessage && message.member.roles.cache.has(gConfig.server.onJoinConfig.preMemberRole)) {
      // eslint-disable-next-line max-len
      const ancientLunaEmoji = client.emojis.cache.find((emoji) => emoji.name === gConfig.server.localEmoji);
      const memberRole = message.guild.roles.cache.get(gConfig.server.memberRole);
      // eslint-disable-next-line max-len
      const preMemberRole = message.guild.roles.cache.get(gConfig.server.onJoinConfig.preMemberRole);
      await message.member.roles.add(memberRole);
      await message.member.roles.remove(preMemberRole);
      await client.channels.cache.get(gConfig.server.generalChannel).send(
        `<@${message.author.id}> has passed the trial by understand our wisdom of lleud to reach this warm sanctuary deeper.\nWelcome, to the sanctuary of lights. The <@&${gConfig.server.elderRole}> welcome you as one of true light seekers ${ancientLunaEmoji}\n<:ancientluna_divinare_s:859034096192978965> read the <#864556584818835456> to give you more access in this sanctuary.`,
      );
    }
    await message.delete().catch((e) => {});
  }
});

client.on('guildMemberAdd', async (member) => {
  const role = member.guild.roles.cache.get(luxCastaId);
  await member.roles.add(role.id).catch((err) => util.printLog('error', err));

  const channel = member.guild.channels.cache.get(gatewayChannelId);

  const welcomeText = new MessageEmbed()
    .setTitle(`Welcome to ${member.guild.name}`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setDescription(`<@${member.user.id}> please understand our **wisdom of lleud** at ${member.guild.channels.cache.get(rulesChannelId).toString()} as you make your way through this warm sanctuary`)
    .setFooter({ text: `${member.user.username}#${member.user.discriminator} visited the sanctuary`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 512 }) })
    .setColor('7289da');
  channel.send({ embeds: [welcomeText] });
});

client.on('guildMemberRemove', async (member) => {
  const channel = member.guild.channels.cache.get(gatewayChannelId);

  const leavingText = new MessageEmbed()
    .setDescription(`The lights get dimmed! **${member.user.username}#${member.user.discriminator}** leaving the sanctuary`)
    .setColor('RED');
  channel.send({ embeds: [leavingText] });
});

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(8080);
