require('dotenv').config();

const { Client, MessageEmbed, Intents, MessageActionRow, MessageButton, Collection, WebhookClient} = require('discord.js');

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

module.exports = client;

const { promisify } = require('util');
const { resolve } = require('path');
const readdir = promisify(require('fs').readdir);

const express = require('express');

const fs = require('fs');
const schedule = require('node-schedule');
const util = require('./utils');

const configFile = require('./config/index');

let gConfig = {};
let toramChannelId = '';
let bdoChannelId = '';
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

client.slashcommands = new Collection();

client.buttons = new Collection();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const sCommandFolders = fs.readdirSync("./src/commapps");
const buttonFolders = fs.readdirSync("./src/buttons");

client.login(process.env.TOKEN).then(() => {
  util.printLog('info', 'Logging in');
});

client.on('ready', async () => {
  util.printLog('info', `Logged in as ${client.user.tag}!`);
  util.printLog('info', 'Loading configuration file...');
  gConfig = configFile.load();
  gatewayChannelId = gConfig.server.gatewayChannel;
  toramChannelId = gConfig.server.toramChannel;
  bdoChannelId = gConfig.server.bdoChannel;
  rulesChannelId = gConfig.server.ruleChannel;
  luxCastaId = gConfig.server.onJoinConfig.preMemberRole;

  client.user.setPresence({
    activities: [{
      name: `around sanctuary`,
      type: `WATCHING`,
    }],
    status: `online`
  });

  // handlers
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }

  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(sCommandFolders, "./src/commapps");
  client.handleButtons(buttonFolders, "./src/buttons");

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
      const welcomeButton = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setStyle("LINK")
            .setLabel("Get more roles here")
            .setURL("https://discord.com/channels/447069790150852609/864556584818835456")
        )
      await message.member.roles.add(memberRole);
      await message.member.roles.remove(preMemberRole);
      await client.channels.cache.get(gConfig.server.generalChannel).send({
        content: `<@${message.author.id}> has passed the trial by understand our wisdom of lleud to reach this warm sanctuary deeper.\nWelcome, to the sanctuary of lights. The <@&${gConfig.server.elderRole}> welcome you as one of true light seekers ${ancientLunaEmoji}`,
        components: [welcomeButton]
      });
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

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  if (reaction.message.channel.id === '864556584818835456') {
    if (reaction.emoji.name === 'game_logo_toram') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('952147085447266364')
      const channelRuin = reaction.message.guild.channels.cache.get(toramChannelId);
      channelRuin.send({
        content: `Welcome to city ruin of luna ${reaction.message.guild.members.cache.get(user.id)}, here get your <#952170767947272303> and start the journey with others <:xpot_toram_potum_cute_chilling:952260990085500978>`
      })
    }
    if (reaction.emoji.name === 'game_logo_bdo') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('856380073745186876')
      const channelCity = reaction.message.guild.channels.cache.get(bdoChannelId);
      channelCity.send({
        content: `Welcome to the hidden secrets of the ancient civilizations ${reaction.message.guild.members.cache.get(user.id)} ,\nA journey to seek the true face of the ancient civilization around the Black Desert awaits you!`
      })
    }
    if (reaction.emoji.name === 'game_logo_apex') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('861400119101095937')
    }
    if (reaction.emoji.name === 'game_logo_df') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('874680389459906580')
    }
    if (reaction.emoji.name === 'ancientluna_divinare_s') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('979164243049975868')
    }
    if (reaction.emoji.name === 'game_logo_mc') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('981470521470382090')
    }
    if (reaction.emoji.name === 'game_logo_valor') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('981479474531024958')
    }
    if (reaction.emoji.name === 'vcon_warning') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('882350441864777769')
    }
    if (reaction.emoji.name === 'ancientluna_divinare') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('989457483531714591')
    }
  } else {
    return;
  }
})

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  if (reaction.message.channel.id === '864556584818835456') {
    if (reaction.emoji.name === 'game_logo_toram') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('952147085447266364')
      const channelRuin = reaction.message.guild.channels.cache.get(toramChannelId);
      channelRuin.send(`<:xpot_toram_potum_sad:952260990337171467> ${reaction.message.guild.members.cache.get(user.id)} is leaving this ruin ...`)
    }
    if (reaction.emoji.name === 'game_logo_bdo') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('856380073745186876')
      const channelCity = reaction.message.guild.channels.cache.get(bdoChannelId);
      channelCity.send(`A source of power so great they are said to have corrupted the minds of ${reaction.message.guild.members.cache.get(user.id)}. Caused the fall of a great civilization ...`)
    }
    if (reaction.emoji.name === 'game_logo_apex') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('861400119101095937')
    }
    if (reaction.emoji.name === 'game_logo_df') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('874680389459906580')
    }
    if (reaction.emoji.name === 'game_logo_mc') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('981470521470382090')
    }
    if (reaction.emoji.name === 'ancientluna_divinare_s') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('979164243049975868')
    }
    if (reaction.emoji.name === 'game_logo_valor') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('981479474531024958')
    }
    if (reaction.emoji.name === 'vcon_warning') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('882350441864777769')
    }
    if (reaction.emoji.name === 'ancientluna_divinare') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('989457483531714591')
    }
  } else {
    return;
  }
})

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(8080);
