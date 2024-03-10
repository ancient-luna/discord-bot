const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ChannelType,
  ButtonStyle,
  PermissionsBitField,
  Collection,
} = require("discord.js");

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
        const ancientLunaEmoji = client.emojis.cache.find(
          (emoji) => emoji.name === client.config.localEmoji
        );
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
            .setURL(
              "https://discord.com/channels/447069790150852609/864556584818835456"
            )
        );
        await message.member.roles.add(memberRole);
        await message.member.roles.remove(preMemberRole);
        const channel = message.member.guild.channels.cache.get(
          client.config.generalChannel
        );
        await channel.send({
          content: `<@${message.author.id}> has passed the trial by understand our wisdom of lleud to reach this warm sanctuary deeper.\nWelcome, to the sanctuary of lights. The <@&${client.config.elderRole}> welcome you as one of true light seekers ${ancientLunaEmoji}`,
          components: [welcomeButton],
        });
      }
      if (!message.author.bot) await message.delete().catch((e) => { });;
    }

    if (
      message.author.bot ||
      message.webhookId ||
      !message.guild ||
      !message.channel
    )
      return;
    if (
      message.channel.type == ChannelType.DM ||
      message.channel.type == ChannelType.GuildForum
    )
      return;
    if (message.partial) await message.fetch();
    if (!message.guild) return;
    if (message.author.bot) return;

    // StickyNote Lucent Fountain
    if (client.config.stickyGuildChannel.includes(message.channel.id)) {
      const fetchedLucentMessages = await message.channel.messages.fetch();
      const stickyLucentMessage = fetchedLucentMessages.find(m => m.author.id === client.user.id && client.config.stickyGuildChannel.includes(m.channel.id));
      const embedLucent = new EmbedBuilder()
        .setTitle(`The Lucent Fountain <:ancientluna_pure_luna:866781517312688178>`)
        .setDescription(`𝑾𝒆 𝒓𝒂𝒏 𝒂𝒔 𝒊𝒇 𝒕𝒐 𝒎𝒆𝒆𝒕 𝒕𝒉𝒆 𝒎𝒐𝒐𝒏\n**[Be the true light seekers](https://youtu.be/_rJiY6y3a-A)** ✦`)
        .setColor("2b2d31")
        .setThumbnail('https://i.imgur.com/Mza9Zop.png')
      const btnLucent = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("btn-guildterms")
            .setLabel("Read Guild Terms")
            .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("btn-guildvacation")
            .setLabel("Vacation")
            .setEmoji('<:game_logo_bdo:861579805660151818>')
            .setStyle(ButtonStyle.Primary)
        )
      if (stickyLucentMessage) {
        stickyLucentMessage.delete().then(() => {
          message.channel.send({
            embeds: [embedLucent],
            components: [btnLucent]
          });
        }).catch(() => { });
      } else {
          // Force send a new message.
          message.channel.send({
            embeds: [embedLucent],
            components: [btnLucent]
          });
      }
    };

    // StickyNote
    if (client.config.stickyChannel.includes(message.channel.id)) {
        const fetchedMessages = await message.channel.messages.fetch();
        const stickyMessage = fetchedMessages.find(m => m.author.id === client.user.id && client.config.stickyChannel.includes(m.channel.id));
        const lunaThumbnail = [
          'https://i.imgur.com/B6u2feA.png', 'https://i.imgur.com/DrmVtuP.png', 'https://i.imgur.com/Z5mq7OF.png', 'https://i.imgur.com/M0U4I56.png', 'https://i.imgur.com/jOGuk7s.png', 'https://i.imgur.com/tM9xIaq.png', 'https://i.imgur.com/hIBEDkM.png', 'https://i.imgur.com/GUYxDJF.png', 'https://i.imgur.com/MjADPRv.png', 'https://i.imgur.com/InURa9o.png', 'https://i.imgur.com/son6e07.png', 'https://i.imgur.com/0wE5Qyp.png', 'https://i.imgur.com/DHzUulL.png', 'https://i.imgur.com/bEIn9Ag.png', 'https://i.imgur.com/qkw8aXV.png',
        ]
        const stickyText = new EmbedBuilder()
            .setTitle(`Ancient Luna Activity Tracker`)
            .setDescription(`Thanks for the hardwork!\nClick on this button to update the payout sheet.`)
            // .setThumbnail(`https://i.imgur.com/JGmEtSL.png`)
            .setThumbnail(`${lunaThumbnail[Math.floor(Math.random() * lunaThumbnail.length)]}`)
            .setColor('#2b2d31');
        let linkSheet = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel(`Payout sheet`)
                    .setURL(`https://docs.google.com/spreadsheets/d/1hb-WK8921d0erv4zQ5vTpBzEsnMNW0VTLycHwyAW3_k`)
            )
        if (stickyMessage) {
            stickyMessage.delete().then(() => {
                message.channel.send({ embeds: [stickyText], components: [linkSheet] });
            }).catch(() => { });
        } else {
            // Force send a new message.
            message.channel.send({ embeds: [stickyText], components: [linkSheet] });
        }
    };

    // Chat AI
    if (client.config.aiChatChannel.includes(message.channel.id)) {
      const noAnswer = "There was an issue getting that AI response. Try again sooner or later <:msg_error:1185521089766502400>";
      // const confuseAI = noAnswer[Math.floor(Math.random() * noAnswer.length)];
      let conversationLog = [
        {
          role: "system",
          content:
            "You are a friendly discord Bot",
        },
      ];
      try {
        const axios = require('axios');
        // const { Gemini } = require('@nishantapps/node-gemini');
        await message.channel.sendTyping();
        // the bot can retrieve old messages and hold a conversation
        let prevMessages = await message.channel.messages.fetch({ limit: 15 });
        prevMessages.reverse();
        prevMessages.forEach((msg) => {
          if (msg.content.startsWith("!")) return;
          if (msg.author.id !== client.user.id && message.author.bot) return;
          if (msg.author.id == client.user.id) {
            conversationLog.push({
              role: "assistant",
              content: msg.content,
              name: msg.author.username
                .replace(/\s+/g, "_")
                .replace(/[^\w\s]/gi, ""),
            });
          }
          if (msg.author.id == message.author.id) {
            conversationLog.push({
              role: "user",
              content: msg.content,
              name: message.author.username
                .replace(/\s+/g, "_")
                .replace(/[^\w\s]/gi, ""),
            });
          }
        });

        const aiChat = {
          method: 'GET',
          url: 'https://google-bard1.p.rapidapi.com/v3/chat/gemini-1.0-pro',
          headers: {
            'api-key': process.env.GOOGLE_MAKERSUITE_KEY,
            message: message.content,
            'harm-category-harassment': 'BLOCK_NONE',
            'harm-category-hate-speech': 'BLOCK_NONE',
            'harm-category-sexually-explicit': 'BLOCK_NONE',
            'harm-category-dangerous-content': 'BLOCK_NONE',
            'X-RapidAPI-Key': process.env.X_RAPID_API,
            'X-RapidAPI-Host': 'google-bard1.p.rapidapi.com'
          }
        };

        // const apiKey = process.env.X_RAPID_API;
        // const makersuiteKey = process.env.GOOGLE_MAKERSUITE_KEY;
        // const temperature = 0.7;
        // const topP = 0.8;
        // const topK = 10;
        // const maxOutputTokens = 50;

        // Gemini.initialize(apiKey, makersuiteKey, temperature, topP, topK, maxOutputTokens);

        try {
          const questionChat = await axios.request(aiChat)
          const outputChat = questionChat.data;
          // const outputChat = responseChat.data.response;
          if (outputChat.length > 2000) {
            const chunks = outputChat.match(/.{1,2000}/g);
            for (let i=0; i < chunks.length; i++) {
              await message.channel.send(chunks[i]).catch(err => {
                console.log(err);
                message.channel.send("I am having a hard time to filling that request! Im an only living wisdom on Discord\nI don't have time to process long requests \`Only 2000 max. per-reply\` <:msg_error:1185521089766502400>").catch(err => {});
              });
            }
          } else {
            await message.channel.send(outputChat).catch(err => {
              console.log(err);
              message.channel.send(`${noAnswer}`).catch(err => {});
            });
          }
        } catch (e) {
          console.error("Error:", e);
          return await message.channel.send(`${noAnswer}`);
        }
      } catch (e) {
        console.log(e);
        message.channel.send(`${noAnswer}`).catch(err => {});
      }
    }


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
