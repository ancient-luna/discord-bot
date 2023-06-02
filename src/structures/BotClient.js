const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
} = require("discord.js");
const Utils = require("../utils/Utils");
const { DiscordTogether } = require("discord-together");
require("dotenv").config();

const Intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildInvites,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildWebhooks,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.DirectMessages,
];

class BotClient extends Client {
  constructor() {
    super({
      shards: "auto",
      allowedMentions: {
        parse: ["users", "roles", "everyone"],
        repliedUser: false,
      },
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
      ],
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
        Partials.Reaction,
      ],
      ws: Intents,
      restTimeOffset: 0,
      restRequestTimeout: 20000,
    });
    this.config = require("../config/config");
    this.Commands = new Collection();
    this.slashCommands = new Collection();
    this.prefix = process.env.COMMAND_PREFIX;
    this.color = this.config.color;
    this.ButtonInt = new Collection();
    this.Cooldown = new Collection();
    this.commadArray = [];
    this.Aliases = new Collection();
    this.console = require("../utils/Console");
    this.util = new Utils(this);
    this.discordTogether = new DiscordTogether(this);
    if (!this.token) this.token = process.env.TOKEN;
    this.connect();
  }

  /**
   * @param {import('discord.js').APIEmbed} data
   * @returns {EmbedBuilder}
   */
  embed(data) {
    return new EmbedBuilder(data);
  }
  /**
   * @param {import('discord.js').APIButtonComponent} data
   * @returns {ButtonBuilder}
   */
  button(data) {
    return new ButtonBuilder(data);
  }
  /**
   * @param {import('discord.js').APISelectMenuComponent} data
   * @returns {StringSelectMenuBuilder}
   */
  menu(data) {
    return new StringSelectMenuBuilder(data);
  }
  /**
   * @param {import('discord.js').APIActionRowComponent} data
   * @returns {ActionRowBuilder}
   */
  row(data) {
    return new ActionRowBuilder(data);
  }

  /**
   * @param {string} search
   * @param {Boolean} exact
   */
  async resolveUsers(search, exact = false) {
    if (!search || typeof search !== "string") return [];
    const users = [];

    // check if userId is passed
    const patternMatch = search.match(/(\d{17,20})/);
    if (patternMatch) {
      const id = patternMatch[1];
      const fetched = await this.users
        .fetch(id, { cache: true })
        .catch(() => {});
      if (fetched) {
        users.push(fetched);
        return users;
      }
    }
  }

  async connect() {
    super.login(process.env.TOKEN);
    require("../scripts/Events")(this);
    require("../scripts/Message")(this);
    require("../scripts/Button")(this);
  }
}

module.exports = { BotClient };
