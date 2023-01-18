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
let bdoChannelId = '';
let artifactChannelId = '';
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
  bdoChannelId = gConfig.server.bdoChannel;
  artifactChannelId = gConfig.server.artifactChannel;
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
    }
    if (reaction.emoji.name === 'game_logo_bdo') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('856380073745186876')
      const channelCity = reaction.message.guild.channels.cache.get(bdoChannelId);
      channelCity.send({
        content: `Welcome to the hidden secrets of the ancient civilizations ${reaction.message.guild.members.cache.get(user.id)} ,\nA journey to seek the true face of the <#1049815440198733895> around the Black Desert awaits you!`
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
  }
  
  else if (reaction.message.channel.id === '1049815440198733895') {
    if (reaction.emoji.name === 'xu_bdo_class_warrior') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050023329072947200')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔄 𝔰𝔱𝔲𝔯𝔡𝔶 𝔰𝔥𝔦𝔢𝔩𝔡, 𝔞 𝔰𝔥𝔞𝔯𝔭 𝔰𝔴𝔬𝔯𝔡, 𝔞𝔫𝔡 𝔲𝔫𝔴𝔞𝔳𝔢𝔯𝔦𝔫𝔤 𝔠𝔬𝔫𝔳𝔦𝔠𝔱𝔦𝔬𝔫.',
        '𝔊𝔬𝔶𝔢𝔫, 𝔪𝔶 𝔟𝔯𝔢𝔱𝔥𝔯𝔢𝔫, 𝔴𝔢 𝔰𝔥𝔞𝔩𝔩 𝔠𝔞𝔯𝔯𝔶 𝔬𝔲𝔱 𝔶𝔬𝔲𝔯 𝔴𝔦𝔩𝔩.',
        '𝔄𝔫 𝔲𝔫𝔣𝔬𝔯𝔤𝔦𝔳𝔦𝔫𝔤 𝔟𝔩𝔞𝔡𝔢. 𝔅𝔬𝔯𝔫 𝔣𝔯𝔬𝔪 𝔞𝔫 𝔦𝔫𝔡𝔬𝔪𝔦𝔱𝔞𝔟𝔩𝔢 𝔴𝔦𝔩𝔩.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/8mhq47l.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Warrior** <:xu_bdo_class_warrior:1049947516529020989>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_ranger') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050023589199495168')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔡𝔞𝔲𝔤𝔥𝔱𝔢𝔯 𝔬𝔣 𝔱𝔥𝔢 𝔤𝔬𝔡𝔡𝔢𝔰𝔰 𝔖𝔶𝔩𝔳𝔦𝔞, 𝔱𝔥𝔢 𝔤𝔲𝔞𝔯𝔡𝔦𝔞𝔫 𝔬𝔣 𝔎𝔞𝔪𝔞𝔰𝔶𝔩𝔳𝔦𝔞.',
        '𝔗𝔥𝔢 𝔬𝔫𝔢 𝔴𝔥𝔬 𝔠𝔬𝔪𝔪𝔲𝔫𝔢𝔰 𝔴𝔦𝔱𝔥 𝔰𝔭𝔦𝔯𝔦𝔱𝔰 𝔱𝔬 𝔰𝔲𝔯𝔭𝔞𝔰𝔰 𝔥𝔢𝔯 𝔩𝔦𝔪𝔦𝔱𝔰. 𝔗𝔥𝔢 𝔰𝔱𝔯𝔢𝔫𝔤𝔱𝔥 𝔬𝔣 𝔎𝔞𝔪𝔞𝔰𝔶𝔩𝔳𝔦𝔞 𝔴𝔦𝔩𝔩 𝔰𝔱𝔞𝔫𝔡 𝔳𝔦𝔠𝔱𝔬𝔯𝔦𝔬𝔲𝔰.',
        '𝔄 𝔰𝔥𝔞𝔯𝔭 𝔰𝔥𝔬𝔱 𝔩𝔢𝔱 𝔩𝔬𝔬𝔰𝔢 𝔣𝔯𝔬𝔪 𝔞 𝔰𝔱𝔢𝔢𝔩 𝔴𝔦𝔩𝔩.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/jLhX7dM.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Ranger** <:xu_bdo_class_ranger:1049947590378135572>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_sorceress') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050023599324540939')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔬𝔫𝔢 𝔴𝔥𝔬 𝔟𝔯𝔦𝔫𝔤𝔰 𝔡𝔢𝔰𝔱𝔯𝔲𝔠𝔱𝔦𝔬𝔫 𝔱𝔬 𝔞𝔩𝔩 𝔴𝔦𝔱𝔥 𝔡𝔞𝔯𝔨 𝔪𝔞𝔤𝔦𝔠.',
        '𝔗𝔥𝔢 𝔦𝔪𝔪𝔬𝔯𝔱𝔞𝔩 𝔴𝔦𝔢𝔩𝔡𝔢𝔯 𝔬𝔣 ℭ𝔞𝔯𝔱𝔦𝔞𝔫’𝔰 𝔰𝔠𝔶𝔱𝔥𝔢.',
        'ℜ𝔢𝔣𝔲𝔰𝔦𝔫𝔤 𝔱𝔥𝔢 𝔣𝔞𝔱𝔢 𝔱𝔥𝔞𝔱 𝔴𝔞𝔰 𝔡𝔢𝔠𝔦𝔡𝔢𝔡 𝔴𝔦𝔱𝔥 𝔱𝔥𝔢 𝔞𝔪𝔲𝔩𝔢𝔱.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/49Nq37M.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Sorceress** <:xu_bdo_class_sorceress:1049947619029426176>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_berserker') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050023814664302713')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔬𝔲𝔤𝔥 𝔟𝔬𝔡𝔶, 𝔬𝔳𝔢𝔯𝔭𝔬𝔴𝔢𝔯𝔦𝔫𝔤 𝔴𝔦𝔩𝔩.',
        '𝔒𝔲𝔯 𝔤𝔯𝔢𝔞𝔱 𝔣𝔬𝔯𝔢𝔣𝔞𝔱𝔥𝔢𝔯, 𝔗𝔞𝔫𝔱𝔲, 𝔴𝔦𝔩𝔩 𝔩𝔢𝔞𝔡 𝔲𝔰.',
        '𝔑𝔞𝔱𝔲𝔯𝔞𝔩 𝔰𝔱𝔯𝔢𝔫𝔤𝔱𝔥 𝔪𝔞𝔵𝔦𝔪𝔦𝔷𝔢𝔡 𝔟𝔶 𝔱𝔥𝔢 𝔴𝔞𝔯𝔯𝔦𝔬𝔯 𝔥𝔦𝔪𝔰𝔢𝔩𝔣.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/MwWEQML.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Berserker** <:xu_bdo_class_berserker:1049947648754458715>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_tamer') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050023856993226804')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔭𝔯𝔦𝔫𝔠𝔢𝔰𝔰 𝔬𝔣 𝔞 𝔣𝔞𝔩𝔩𝔢𝔫 𝔨𝔦𝔫𝔤𝔡𝔬𝔪 𝔱𝔥𝔞𝔱 𝔣𝔬𝔲𝔫𝔡 𝔣𝔞𝔪𝔦𝔩𝔶 𝔦𝔫 𝔞 𝔪𝔶𝔰𝔱𝔦𝔠𝔞𝔩 𝔟𝔢𝔞𝔰𝔱.',
        '𝔗𝔯𝔲𝔢 𝔪𝔞𝔰𝔱𝔢𝔯 𝔬𝔣 ℌ𝔢𝔦𝔩𝔞𝔫𝔤, 𝔩𝔢𝔞𝔡𝔰 𝔴𝔦𝔱𝔥 𝔞 𝔭𝔬𝔴𝔢𝔯 𝔱𝔥𝔞𝔱 𝔰𝔥𝔞𝔨𝔢𝔰 𝔱𝔥𝔢 𝔥𝔢𝔞𝔳𝔢𝔫𝔰.',
        'ℑ𝔫𝔰𝔱𝔦𝔫𝔠𝔱 𝔬𝔫𝔠𝔢 𝔩𝔬𝔰𝔱, 𝔞 𝔰𝔥𝔬𝔯𝔱𝔰𝔴𝔬𝔯𝔡 𝔯𝔢𝔨𝔦𝔫𝔡𝔩𝔢𝔡.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/iJRr8ym.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Tamer** <:xu_bdo_class_tamer:1049949113300570142>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_musa') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050023861820850196')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔭𝔞𝔱𝔥 𝔬𝔣 𝔱𝔥𝔢 𝔟𝔩𝔞𝔡𝔢 𝔱𝔥𝔞𝔱 𝔠𝔲𝔱𝔰 𝔱𝔥𝔯𝔬𝔲𝔤𝔥 𝔱𝔥𝔢 𝔴𝔦𝔫𝔡.',
        '𝔈𝔫𝔩𝔦𝔤𝔥𝔱𝔢𝔫𝔢𝔡 𝔟𝔶 𝔱𝔥𝔢 𝔴𝔞𝔶 𝔬𝔣 𝔞 𝔴𝔞𝔯𝔯𝔦𝔬𝔯, 𝔥𝔢 𝔯𝔢𝔱𝔲𝔯𝔫𝔰 𝔞𝔰 𝔞 𝔡𝔢𝔦𝔱𝔶 𝔬𝔣 𝔪𝔞𝔯𝔱𝔦𝔞𝔩 𝔞𝔯𝔱𝔰.',
        '𝔅𝔯𝔢𝔞𝔨𝔦𝔫𝔤 𝔬𝔲𝔱 𝔬𝔣 𝔱𝔥𝔢 𝔠𝔶𝔠𝔩𝔢 𝔴𝔦𝔱𝔥 𝔞 𝔯𝔢𝔰𝔬𝔩𝔲𝔱𝔢 𝔟𝔩𝔞𝔡𝔢.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/rv1Ynri.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Musa** <:xu_bdo_class_musa:1049949132376248421>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_maehwa') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050023865629298688')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔄 𝔰𝔥𝔦𝔫𝔦𝔫𝔤 𝔟𝔩𝔞𝔡𝔢 𝔞𝔪𝔬𝔫𝔤 𝔱𝔥𝔢 𝔣𝔞𝔩𝔩𝔦𝔫𝔤 𝔭𝔢𝔱𝔞𝔩𝔰.',
        '𝔚𝔥𝔢𝔫 𝔱𝔥𝔢 𝔞𝔯𝔱 𝔦𝔰 𝔭𝔢𝔯𝔣𝔢𝔠𝔱𝔢𝔡, 𝔱𝔥𝔢 𝔨𝔢𝔯𝔦𝔰𝔭𝔢𝔞𝔯 𝔴𝔦𝔩𝔩 𝔯𝔢𝔰𝔭𝔬𝔫𝔡.',
        '𝔗𝔥𝔢 𝔰𝔥𝔞𝔯𝔭𝔢𝔫𝔢𝔡 𝔟𝔩𝔞𝔡𝔢 𝔠𝔞𝔯𝔳𝔢𝔰 𝔞 𝔫𝔢𝔴 𝔡𝔢𝔰𝔱𝔦𝔫𝔶.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/6HZDRtx.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Maehwa** <:xu_bdo_class_maehwa:1049949154455068672>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_valkyrie') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050023868833734666')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔨𝔫𝔦𝔤𝔥𝔱 𝔬𝔣 𝔈𝔩𝔦𝔬𝔫 𝔲𝔫𝔡𝔢𝔯 ℌ𝔦𝔰 𝔭𝔯𝔬𝔱𝔢𝔠𝔱𝔦𝔬𝔫.',
        '𝔚𝔦𝔱𝔥 𝔧𝔲𝔰𝔱𝔦𝔠𝔢 𝔦𝔫 𝔶𝔬𝔲𝔯 𝔪𝔦𝔫𝔡, 𝔈𝔩𝔦𝔬𝔫 𝔦𝔫 𝔶𝔬𝔲𝔯 𝔥𝔢𝔞𝔯𝔱, 𝔞𝔫𝔡 𝔳𝔦𝔯𝔱𝔲𝔢𝔰 𝔯𝔢𝔰𝔱𝔦𝔫𝔤 𝔬𝔫 𝔱𝔥𝔢 𝔱𝔦𝔭 𝔬𝔣 𝔶𝔬𝔲𝔯 𝔩𝔞𝔫𝔠𝔦𝔞.',
        '𝔘𝔫𝔟𝔯𝔢𝔞𝔨𝔞𝔟𝔩𝔢 𝔠𝔬𝔫𝔳𝔦𝔠𝔱𝔦𝔬𝔫 𝔣𝔬𝔯𝔤𝔢𝔡 𝔞𝔱 𝔱𝔥𝔢 𝔢𝔫𝔡 𝔬𝔣 𝔞 𝔰𝔥𝔞𝔯𝔭 𝔟𝔩𝔞𝔡𝔢.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/GyGTUxc.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Valkyrie** <:xu_bdo_class_valkyrie:1049949201431285831>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_kunoichi') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050023872814121000')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔞𝔰𝔰𝔞𝔰𝔰𝔦𝔫 𝔣𝔯𝔬𝔪 𝔱𝔥𝔢 𝔰𝔥𝔞𝔡𝔬𝔴𝔰.',
        "ℑ'𝔩𝔩 𝔪𝔞𝔨𝔢 𝔱𝔥𝔢𝔪 𝔭𝔞𝔶 𝔣𝔬𝔯 𝔴𝔥𝔞𝔱 𝔱𝔥𝔢𝔶'𝔳𝔢 𝔡𝔬𝔫𝔢. ℑ 𝔴𝔦𝔩𝔩 𝔫𝔢𝔳𝔢𝔯 𝔰𝔱𝔬𝔭 𝔲𝔫𝔱𝔦𝔩 𝔠𝔯𝔦𝔪𝔰𝔬𝔫 𝔟𝔩𝔬𝔬𝔡 𝔠𝔬𝔳𝔢𝔯𝔰 𝔱𝔥𝔢𝔪 𝔞𝔩𝔩.",
        '𝔗𝔥𝔢 𝔷𝔢𝔫 𝔢𝔵𝔢𝔠𝔲𝔱𝔦𝔬𝔫𝔢𝔯 𝔬𝔳𝔢𝔯𝔠𝔬𝔪𝔦𝔫𝔤 𝔥𝔢𝔯 𝔱𝔥𝔦𝔯𝔰𝔱 𝔣𝔬𝔯 𝔯𝔢𝔳𝔢𝔫𝔤𝔢.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Kunoichi** <:xu_bdo_class_kunoichi:1049949246603935775>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_ninja') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024007006699520')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔞𝔰𝔰𝔞𝔰𝔰𝔦𝔫 𝔴𝔦𝔱𝔥 𝔞 𝔱𝔞𝔯𝔤𝔢𝔱 𝔬𝔫 𝔱𝔥𝔢 𝔟𝔞𝔠𝔨 𝔬𝔣 𝔢𝔳𝔢𝔯𝔶 𝔢𝔫𝔢𝔪𝔶.',
        '𝔒𝔫 𝔱𝔥𝔢 𝔡𝔞𝔶 𝔴𝔥𝔢𝔫 𝔖𝔲𝔯𝔞 𝔯𝔢𝔱𝔲𝔯𝔫𝔰, 𝔱𝔥𝔢 𝔑𝔞𝔯𝔲𝔰𝔞𝔴𝔞 𝔣𝔩𝔞𝔤 𝔰𝔥𝔞𝔩𝔩 𝔣𝔩𝔶 𝔞𝔤𝔞𝔦𝔫 𝔬𝔫 𝔱𝔥𝔢 𝔣𝔦𝔢𝔩𝔡 𝔬𝔣 𝔟𝔞𝔱𝔱𝔩𝔢.',
        '𝔗𝔥𝔢 𝔄𝔰𝔰𝔞𝔰𝔰𝔦𝔫 𝔰𝔲𝔯𝔭𝔞𝔰𝔰𝔢𝔰 𝔥𝔦𝔰 𝔩𝔦𝔪𝔦𝔱𝔰 𝔱𝔬 𝔭𝔯𝔬𝔱𝔢𝔠𝔱 𝔱𝔥𝔢 𝔬𝔫𝔢𝔰 𝔥𝔢 𝔩𝔬𝔳𝔢𝔰.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/dLd7J9d.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Ninja** <:xu_bdo_class_ninja:1049949280699432990>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_wizard') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024032881344633')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔞𝔭𝔢𝔵 𝔬𝔣 𝔪𝔞𝔤𝔦𝔠𝔞𝔩 𝔞𝔟𝔦𝔩𝔦𝔱𝔶.',
        '𝔚𝔥𝔢𝔫 𝔟𝔞𝔩𝔞𝔫𝔠𝔢 𝔦𝔰 𝔣𝔬𝔲𝔫𝔡 𝔟𝔢𝔱𝔴𝔢𝔢𝔫 𝔯𝔞𝔤𝔢 𝔞𝔫𝔡 𝔯𝔢𝔞𝔰𝔬𝔫, 𝔥𝔦𝔰 𝔱𝔯𝔲𝔢 𝔭𝔬𝔴𝔢𝔯 ℑ𝔰 𝔟𝔬𝔯𝔫.',
        "𝔗𝔥𝔢 𝔭𝔯𝔬𝔭𝔥𝔢𝔱 𝔴𝔥𝔬'𝔰 𝔬𝔫𝔠𝔢 𝔞𝔤𝔞𝔦𝔫 𝔱𝔯𝔞𝔫𝔰𝔠𝔢𝔫𝔡𝔢𝔡 𝔥𝔦𝔰 𝔩𝔦𝔪𝔦𝔱𝔰."
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/MX2acTM.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Wizard** <:xu_bdo_class_wizard:1049949303210258472>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_witch') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024041613885452')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔤𝔦𝔯𝔩 𝔱𝔥𝔞𝔱 𝔴𝔦𝔢𝔩𝔡𝔰 𝔱𝔥𝔢 𝔭𝔬𝔴𝔢𝔯 𝔬𝔣 𝔱𝔥𝔢 𝔢𝔩𝔢𝔪𝔢𝔫𝔱𝔰.',
        '𝔖𝔢𝔢𝔨 𝔱𝔥𝔢 𝔱𝔯𝔲𝔱𝔥 𝔴𝔦𝔱𝔥 𝔭𝔲𝔯𝔢 𝔭𝔞𝔰𝔰𝔦𝔬𝔫. 𝔗𝔥𝔢 𝔢𝔩𝔢𝔪𝔢𝔫𝔱𝔞𝔩 𝔩𝔬𝔬𝔨𝔬𝔲𝔱𝔰 𝔴𝔦𝔩𝔩 𝔞𝔫𝔰𝔴𝔢𝔯 𝔶𝔬𝔲𝔯 𝔠𝔞𝔩𝔩.',
        'ℌ𝔢𝔯 𝔢𝔫𝔡𝔩𝔢𝔰𝔰 𝔡𝔢𝔳𝔬𝔱𝔦𝔬𝔫 𝔱𝔬 𝔯𝔢𝔰𝔢𝔞𝔯𝔠𝔥 𝔥𝔞𝔰 𝔥𝔬𝔫𝔢𝔡 𝔰𝔲𝔠𝔥 𝔴𝔦𝔰𝔡𝔬𝔪'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/5mtNcAc.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Witch** <:xu_bdo_class_witch:1049949358738657340>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_darkknight') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024056293969930')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔣𝔩𝔞𝔪𝔢𝔰 𝔟𝔲𝔯𝔫𝔦𝔫𝔤 𝔲𝔫𝔡𝔢𝔯 𝔱𝔥𝔢 𝔪𝔬𝔬𝔫𝔩𝔦𝔤𝔥𝔱.',
        'ℑ𝔰 𝔱𝔥𝔢𝔯𝔢 𝔞𝔫𝔶𝔱𝔥𝔦𝔫𝔤 𝔞𝔰 𝔟𝔢𝔞𝔲𝔱𝔦𝔣𝔲𝔩 𝔞𝔰 𝔱𝔥𝔢 𝔣𝔩𝔞𝔪𝔢 𝔣𝔯𝔬𝔪 𝔟𝔲𝔯𝔫𝔦𝔫𝔤 𝔰𝔭𝔦𝔯𝔦𝔱 𝔢𝔫𝔢𝔯𝔤𝔶?',
        '𝔄 𝔖𝔦𝔫𝔤𝔩𝔢 𝔖𝔴𝔬𝔯𝔡 𝔱𝔬 𝔘𝔭𝔥𝔬𝔩𝔡 𝔍𝔲𝔰𝔱𝔦𝔠𝔢'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/LvGgoHJ.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Dark Knight** <:xu_bdo_class_darkknight:1049950571903324170>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_striker') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024063575273532')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔖𝔲𝔯𝔭𝔞𝔰𝔰𝔦𝔫𝔤 𝔭𝔥𝔶𝔰𝔦𝔠𝔞𝔩 𝔩𝔦𝔪𝔦𝔱𝔞𝔱𝔦𝔬𝔫𝔰.',
        '𝔈𝔳𝔢𝔯 𝔣𝔬𝔲𝔤𝔥𝔱 𝔶𝔬𝔲𝔯𝔰𝔢𝔩𝔣 𝔴𝔦𝔱𝔥 𝔶𝔬𝔲𝔯 𝔩𝔦𝔣𝔢 𝔬𝔫 𝔱𝔥𝔢 𝔩𝔦𝔫𝔢?',
        "𝔗𝔥𝔢 𝔪𝔞𝔯𝔱𝔦𝔞𝔩 𝔞𝔯𝔱𝔦𝔰𝔱 𝔴𝔦𝔱𝔥 𝔞 𝔣𝔢𝔯𝔬𝔠𝔦𝔬𝔲𝔰 𝔟𝔢𝔞𝔰𝔱'𝔰 𝔰𝔭𝔦𝔯𝔦𝔱 𝔴𝔦𝔱𝔥𝔦𝔫."
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/gFcFm1y.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Striker** <:xu_bdo_class_striker:1049950590253412442>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_mystic') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024207637024779')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔪𝔞𝔰𝔱𝔢𝔯 𝔬𝔣 𝔪𝔞𝔯𝔱𝔦𝔞𝔩 𝔞𝔯𝔱𝔰 𝔱𝔥𝔞𝔱 𝔰𝔥𝔬𝔬𝔨 𝔱𝔥𝔢 𝔢𝔞𝔯𝔱𝔥 ℑ𝔱𝔰𝔢𝔩𝔣.',
        '𝔗𝔥𝔢 𝔟𝔩𝔲𝔢 𝔢𝔶𝔢𝔰, 𝔠𝔬𝔫𝔫𝔢𝔠𝔱𝔢𝔡 𝔟𝔶 𝔣𝔞𝔱𝔢, 𝔴𝔦𝔩𝔩 𝔪𝔢𝔢𝔱 𝔞𝔤𝔞𝔦𝔫 𝔦𝔫 𝔅𝔞𝔫𝔥𝔞’𝔰 𝔱𝔢𝔞𝔯𝔰…',
        'ℜ𝔢𝔪𝔬𝔳𝔦𝔫𝔤 𝔞𝔩𝔩 𝔢𝔪𝔬𝔱𝔦𝔬𝔫 𝔣𝔯𝔬𝔪 𝔥𝔢𝔯 𝔞𝔯𝔱, 𝔰𝔢𝔞𝔩𝔦𝔫𝔤 𝔦𝔱 𝔞𝔩𝔩 𝔦𝔫 𝔬𝔫𝔢 𝔟𝔩𝔬𝔴.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/Xyh2bS8.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Mystic** <:xu_bdo_class_mystic:1049950610281201704>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_archer') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024223416012900')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔣𝔬𝔯𝔤𝔬𝔱𝔱𝔢𝔫 𝔰𝔬𝔫 𝔬𝔣 𝔖𝔶𝔩𝔳𝔦𝔞, 𝔭𝔯𝔬𝔱𝔢𝔠𝔱𝔬𝔯 𝔬𝔣 𝔱𝔥𝔢 𝔯𝔢𝔞𝔩𝔪.',
        '𝔄𝔩𝔩 𝔴𝔥𝔬 𝔱𝔥𝔯𝔢𝔞𝔱𝔢𝔫 𝔱𝔥𝔢 𝔰𝔞𝔠𝔯𝔢𝔡 𝔱𝔯𝔢𝔢 𝔠𝔞𝔫𝔫𝔬𝔱 𝔢𝔰𝔠𝔞𝔭𝔢 𝔱𝔥𝔢 𝔧𝔲𝔰𝔱𝔦𝔠𝔢 𝔬𝔣 𝔪𝔶 𝔟𝔬𝔴.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/FqkNHuN.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Archer** <:xu_bdo_class_archer:1049950676798681138>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_lahn') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024215144841297')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔡𝔞𝔫𝔠𝔢 𝔬𝔣 𝔡𝔢𝔞𝔱𝔥 𝔣𝔦𝔩𝔩𝔰 𝔱𝔥𝔢 𝔰𝔨𝔶 𝔴𝔦𝔱𝔥 𝔯𝔢𝔡.',
        '𝔅𝔩𝔬𝔬𝔡 𝔣𝔬𝔯 𝔟𝔩𝔬𝔬𝔡.',
        'ℌ𝔦𝔡𝔡𝔢𝔫 𝔟𝔢𝔥𝔦𝔫𝔡 𝔱𝔥𝔢 𝔰𝔭𝔩𝔢𝔫𝔡𝔬𝔯, 𝔞𝔫 𝔲𝔫𝔡𝔦𝔰𝔭𝔲𝔱𝔢𝔡 𝔟𝔩𝔞𝔡𝔢.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/sD0JgWc.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Lahn** <:xu_bdo_class_lahn:1049950659245518878>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_shai') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024230789586944')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔖𝔱𝔬𝔭 𝔱𝔥𝔦𝔫𝔨𝔦𝔫𝔤 𝔰𝔬 𝔪𝔲𝔠𝔥. 𝔏𝔢𝔱’𝔰 𝔤𝔬 𝔥𝔞𝔳𝔢 𝔣𝔲𝔫!',
        "𝔏𝔦𝔰𝔱𝔢𝔫 𝔱𝔬 𝔪𝔶 𝔰𝔬𝔫𝔤𝔰 𝔴𝔥𝔢𝔫 𝔶𝔬𝔲'𝔯𝔢 𝔰𝔠𝔞𝔯𝔢𝔡! 𝔗𝔬𝔬𝔱! 𝔗𝔬𝔬𝔱! 𝔇𝔬 𝔶𝔬𝔲 𝔣𝔢𝔢𝔩 𝔟𝔢𝔱𝔱𝔢𝔯?"
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/GErJhhL.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Shai** <:xu_bdo_class_shai:1049950694699962448>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_guardian') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024235403313162')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔲𝔫𝔣𝔬𝔯𝔤𝔦𝔳𝔦𝔫𝔤 𝔧𝔲𝔡𝔦𝔠𝔞𝔱𝔬𝔯 𝔴𝔯𝔞𝔭𝔭𝔢𝔡 𝔦𝔫 𝔱𝔥𝔢 𝔠𝔥𝔦𝔩𝔩 𝔬𝔣 𝔢𝔱𝔢𝔯𝔫𝔞𝔩 𝔴𝔦𝔫𝔱𝔢𝔯.',
        '𝔗𝔥𝔢 𝔰𝔩𝔞𝔶𝔢𝔯 𝔴𝔥𝔬 𝔯𝔦𝔰𝔢𝔰 𝔬𝔲𝔱 𝔬𝔣 𝔬𝔟𝔩𝔦𝔳𝔦𝔬𝔫 𝔞𝔣𝔱𝔢𝔯 𝔯𝔢𝔠𝔩𝔞𝔦𝔪𝔦𝔫𝔤 𝔱𝔥𝔢 ℌ𝔬𝔩𝔶 𝔉𝔩𝔞𝔪𝔢.',
        "𝔗𝔥𝔢 𝔟𝔞𝔱𝔱𝔩𝔢 𝔞𝔵𝔢 𝔱𝔥𝔞𝔱 𝔟𝔯𝔢𝔞𝔨𝔰 𝔞𝔩𝔩 𝔬𝔣 𝔱𝔥𝔢 𝔴𝔬𝔯𝔩𝔡'𝔰 𝔰𝔠𝔞𝔩𝔢𝔰."
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/EWbbpT8.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Guardian** <:xu_bdo_class_guardian:1049950710432804935>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_hashashin') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024239173992458')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        "𝔗𝔥𝔢 𝔡𝔦𝔳𝔦𝔫𝔢 𝔭𝔲𝔫𝔦𝔰𝔥𝔢𝔯 𝔩𝔢𝔞𝔡𝔦𝔫𝔤 𝔅𝔩𝔞𝔠𝔨𝔰𝔱𝔞𝔯'𝔰 𝔭𝔞𝔯𝔞𝔡𝔦𝔰𝔢.",
        '𝔒𝔳𝔢𝔯𝔠𝔬𝔪𝔢 𝔱𝔥𝔢 𝔱𝔯𝔦𝔞𝔩𝔰 𝔬𝔣 𝔠𝔬𝔫𝔱𝔢𝔪𝔭𝔱 𝔱𝔬 𝔠𝔬𝔪𝔪𝔞𝔫𝔡 𝔱𝔯𝔲𝔢 𝔞𝔲𝔱𝔥𝔬𝔯𝔦𝔱𝔶 𝔬𝔳𝔢𝔯 𝔱𝔥𝔢 𝔰𝔞𝔫𝔡𝔰.',
        "𝔖𝔱𝔞𝔫𝔡 𝔣𝔦𝔯𝔪, 𝔬𝔫𝔠𝔢 𝔪𝔬𝔯𝔢, 𝔞𝔱 𝔱𝔥𝔢 𝔴𝔬𝔯𝔩𝔡'𝔰 𝔢𝔫𝔡 𝔞𝔰 𝔱𝔥𝔢 𝔭𝔦𝔢𝔯𝔠𝔦𝔫𝔤 𝔟𝔩𝔞𝔠𝔨 𝔴𝔥𝔦𝔯𝔩𝔴𝔦𝔫𝔡."
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/uMXMYAE.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Hashashin** <:xu_bdo_class_hashashin:1049950741785227344>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_nova') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024242323927062')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        "𝔗𝔥𝔢 𝔨𝔦𝔫𝔤𝔡𝔬𝔪 𝔬𝔣 ℭ𝔞𝔩𝔭𝔥𝔢𝔬𝔫'𝔰 𝔩𝔞𝔰𝔱 𝔰𝔱𝔞𝔯 𝔴𝔥𝔬 𝔢𝔪𝔟𝔯𝔞𝔠𝔢𝔰 𝔱𝔥𝔞𝔱 𝔡𝔞𝔯𝔨𝔫𝔢𝔰𝔰 𝔬𝔣 𝔱𝔥𝔢 𝔇𝔦𝔰𝔱𝔬𝔯𝔱𝔢𝔡 𝔊𝔬𝔡𝔡𝔢𝔰𝔰.",
        '𝔅𝔩𝔬𝔬𝔡𝔶 𝔔𝔲𝔢𝔢𝔫 𝔬𝔣 𝔗𝔥𝔬𝔯𝔫𝔰 𝔬𝔣 𝔱𝔥𝔢 𝔅𝔞𝔱𝔱𝔩𝔢𝔣𝔦𝔢𝔩𝔡',
        'ℑ 𝔠𝔞𝔩𝔩 𝔲𝔭𝔬𝔫 𝔱𝔥𝔢 𝔎𝔦𝔫𝔤 𝔬𝔣 𝔱𝔥𝔢 𝔇𝔢𝔞𝔡, 𝔞𝔴𝔞𝔨𝔢𝔫 𝔣𝔯𝔬𝔪 𝔶𝔬𝔲𝔯 𝔩𝔬𝔫𝔤 𝔰𝔩𝔲𝔪𝔟𝔢𝔯 𝔞𝔫𝔡 𝔰𝔴𝔢𝔞𝔯 𝔶𝔬𝔲𝔯 𝔩𝔬𝔶𝔞𝔩𝔱𝔶 𝔱𝔬 𝔪𝔢.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/ZKyiFHl.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Nova** <:xu_bdo_class_nova:1049950759225151519>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_sage') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024246442721300')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔗𝔥𝔢 𝔄𝔫𝔠𝔦𝔢𝔫𝔱 𝔴𝔥𝔬 𝔞𝔴𝔞𝔦𝔱𝔢𝔡 𝔱𝔥𝔢 𝔢𝔫𝔡 𝔱𝔦𝔪𝔢𝔰 𝔞𝔴𝔞𝔨𝔢𝔫𝔢𝔡 𝔣𝔯𝔬𝔪 𝔱𝔥𝔢 𝔳𝔬𝔦𝔡 𝔬𝔣 𝔢𝔱𝔢𝔯𝔫𝔦𝔱𝔶.',
        '𝔗𝔥𝔢 𝔩𝔞𝔰𝔱 𝔄𝔫𝔠𝔦𝔢𝔫𝔱 𝔴𝔦𝔢𝔩𝔡𝔰 𝔞 𝔰𝔭𝔢𝔞𝔯 𝔬𝔣 𝔩𝔦𝔤𝔥𝔱𝔫𝔦𝔫𝔤 𝔱𝔬 𝔯𝔢𝔳𝔢𝔯𝔰𝔢 𝔱𝔥𝔢 𝔣𝔞𝔱𝔢 𝔬𝔣 𝔱𝔥𝔢 𝔴𝔬𝔯𝔩𝔡.',
        'ℌ𝔞𝔳𝔦𝔫𝔤 𝔯𝔢𝔤𝔞𝔦𝔫𝔢𝔡 𝔥𝔦𝔰 𝔩𝔬𝔰𝔱 𝔭𝔬𝔴𝔢𝔯, 𝔥𝔢 𝔥𝔞𝔰 𝔞𝔠𝔥𝔦𝔢𝔳𝔢𝔡 𝔥𝔦𝔰 𝔠𝔬𝔪𝔭𝔩𝔢𝔱𝔢 𝔣𝔬𝔯𝔪.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/53UDmDL.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Sage** <:xu_bdo_class_sage:1049950787968704512>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_corsair') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024464345219073')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔚𝔞𝔦𝔱 𝔣𝔬𝔯 𝔪𝔢, 𝔴𝔬𝔯𝔩𝔡! 𝔉𝔬𝔯 ℑ 𝔠𝔩𝔞𝔦𝔪 𝔶𝔢 𝔞𝔰 𝔪𝔢 𝔬𝔴𝔫! ℌ𝔞𝔥𝔞!',
        '𝔐𝔢 𝔟𝔢𝔩𝔬𝔳𝔢𝔡 𝔠𝔯𝔢𝔴! 𝔉𝔬𝔩𝔩𝔬𝔴 𝔪𝔢 𝔩𝔢𝔞𝔡, 𝔬𝔭𝔢𝔫 𝔣𝔦𝔯𝔢!',
        'ℜ𝔦𝔡𝔦𝔫𝔤 𝔥𝔢𝔯 𝔡𝔯𝔢𝔞𝔪𝔰 𝔱𝔬 𝔰𝔦𝔫𝔤 𝔣𝔬𝔯𝔱𝔥 𝔞 𝔥𝔲𝔤𝔢 𝔱𝔦𝔡𝔞𝔩 𝔴𝔞𝔳𝔢!'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/zbsHwAB.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Corsair** <:xu_bdo_class_corsair:1049950807581261876>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_drakania') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024471060283402')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔒𝔫𝔩𝔶 𝔱𝔥𝔢 𝔡𝔢𝔰𝔱𝔯𝔲𝔠𝔱𝔦𝔬𝔫 𝔬𝔣 𝔱𝔥𝔢 𝔤𝔬𝔡-𝔠𝔬𝔫𝔰𝔲𝔪𝔦𝔫𝔤 𝔣𝔩𝔞𝔪𝔢 𝔴𝔦𝔩𝔩 𝔯𝔢𝔰𝔱𝔬𝔯𝔢 𝔱𝔥𝔢 𝔩𝔬𝔫𝔤-𝔩𝔬𝔰𝔱 𝔭𝔞𝔯𝔞𝔡𝔦𝔰𝔢 𝔬𝔣 𝔡𝔯𝔞𝔤𝔬𝔫𝔰.',
        '𝔇𝔢𝔰𝔱𝔯𝔲𝔠𝔱𝔦𝔬𝔫 𝔱𝔞𝔨𝔢𝔰 𝔣𝔩𝔦𝔤𝔥𝔱, 𝔦𝔤𝔫𝔦𝔱𝔦𝔫𝔤 𝔱𝔥𝔢 𝔣𝔯𝔬𝔷𝔢𝔫 𝔰𝔨𝔶.',
        '𝔒𝔲𝔯 𝔥𝔢𝔞𝔯𝔱𝔰 𝔟𝔢𝔞𝔱 𝔞𝔰 𝔬𝔫𝔢 𝔟𝔢𝔶𝔬𝔫𝔡 𝔡𝔢𝔞𝔱𝔥.'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/NzvTRJf.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Drakania** <:xu_bdo_class_drakania:1049951657632464927>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_woosa') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024471060283402')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔚𝔦𝔱𝔥 𝔢𝔩𝔢𝔤𝔞𝔫𝔱, 𝔣𝔩𝔲𝔱𝔱𝔢𝔯𝔦𝔫𝔤 𝔟𝔲𝔱𝔱𝔢𝔯𝔣𝔩𝔶 𝔴𝔦𝔫𝔤𝔰, 𝔱𝔥𝔢 𝔚𝔬𝔬𝔡𝔬 𝔖𝔠𝔥𝔬𝔬𝔩’𝔰 𝔇𝔬 𝔴𝔦𝔢𝔩𝔡𝔢𝔯 𝔟𝔯𝔦𝔫𝔤𝔰 𝔣𝔬𝔯𝔱𝔥 𝔱𝔥𝔢 𝔰𝔱𝔬𝔯𝔪𝔰.',
        '𝔗𝔥𝔢 𝔅𝔲𝔱𝔱𝔢𝔯𝔣𝔩𝔶 𝔬𝔫 𝔱𝔥𝔢 𝔓𝔞𝔱𝔥 𝔱𝔬 𝔈𝔫𝔩𝔦𝔤𝔥𝔱𝔢𝔫𝔪𝔢𝔫𝔱'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/Sjc6F8x.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/fQc6gVq.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Woosa** <:xu_bdo_class_woosa:1052507345135083540>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
    }
    if (reaction.emoji.name === 'xu_bdo_class_maegu') {
      // await reaction.message.guild.members.cache.get(user.id).roles.add('1050024471060283402')
      const channelArtifact = reaction.message.guild.channels.cache.get(artifactChannelId);
      const quoteText = [
        '𝔇𝔞𝔯𝔢 𝔫𝔬𝔱 𝔣𝔞𝔩𝔩 𝔦𝔫𝔱𝔬 𝔱𝔥𝔢 𝔱𝔯𝔞𝔭 𝔬𝔣 𝔱𝔥𝔢 𝔞𝔩𝔩𝔲𝔯𝔦𝔫𝔤 𝔣𝔬𝔵 𝔰𝔭𝔦𝔯𝔦𝔱𝔰 𝔠𝔞𝔩𝔩𝔢𝔡 𝔣𝔬𝔯𝔱𝔥 𝔟𝔶 𝔱𝔥𝔢 𝔇𝔬 𝔴𝔦𝔢𝔩𝔡𝔢𝔯 𝔬𝔣 𝔱𝔥𝔢 𝔍𝔴𝔞𝔡𝔬 𝔖𝔠𝔥𝔬𝔬𝔩',
        '𝔉𝔬𝔵 𝔪𝔞𝔡𝔢 𝔠𝔬𝔪𝔭𝔩𝔢𝔱𝔢 𝔱𝔥𝔯𝔬𝔲𝔤𝔥 𝔞 𝔫𝔢𝔴 𝔭𝔞𝔠𝔱'
      ]
      const classText = new MessageEmbed()
        .setAuthor({ name: "CHOSEN MAIN CLASS", iconURL: "https://i.imgur.com/oB319WT.png" })
        .setFooter({ text: 'Elionian Year' })
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/fQc6gVq.png')
        .setDescription(`${quoteText[Math.floor(Math.random() * quoteText.length)]}\n\nAncient Civilizations Name: ${reaction.message.guild.members.cache.get(user.id)}\nChosen Main Class: **Maegu** <:xu_bdo_class_maegu:1065107815552782418>`)
        .setColor('2f3136');
      channelArtifact.send({ embeds: [classText] });
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
    }
    if (reaction.emoji.name === 'game_logo_bdo') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('856380073745186876')
      const channelCity = reaction.message.guild.channels.cache.get(bdoChannelId);
      channelCity.send(`${reaction.message.guild.members.cache.get(user.id)} is leaving this city ...`)
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
