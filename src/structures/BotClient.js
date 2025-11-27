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
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
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
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildPresences,
];

class SimpleDB {
  constructor() {
    const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'database.sqlite');
    
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    
    this.db = new sqlite3.Database(dbPath);
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXISTS keyvalue (key TEXT PRIMARY KEY, value TEXT)");
    });
    console.log(`Database initialized at: ${dbPath}`);
  }

  async set(key, value) {
    return new Promise((resolve, reject) => {
      const serializedValue = JSON.stringify(value);
      this.db.run("INSERT OR REPLACE INTO keyvalue (key, value) VALUES (?, ?)", [key, serializedValue], (err) => {
        if (err) {
          console.error('Database set error:', err);
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT value FROM keyvalue WHERE key = ?", [key], (err, row) => {
        if (err) {
          console.error('Database get error:', err);
          reject(err);
        } else if (row) {
          try {
            resolve(JSON.parse(row.value));
          } catch (parseErr) {
            console.error('JSON parse error:', parseErr);
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    });
  }

  async push(key, value) {
    return new Promise(async (resolve, reject) => {
      try {
        let arr = await this.get(key) || [];
        arr.push(value);
        const result = await this.set(key, arr);
        resolve(result);
      } catch (err) {
        console.error('Database push error:', err);
        reject(err);
      }
    });
  }

  async delete(key) {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM keyvalue WHERE key = ?", [key], (err) => {
        if (err) {
          console.error('Database delete error:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          console.error('Database close error:', err);
          reject(err);
        } else {
          console.log('Database connection closed');
          resolve();
        }
      });
    });
  }
}

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
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildPresences,
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
    this.db = new SimpleDB();
    if (!this.token) this.token = process.env.TOKEN;
    this.connect();
  }

  embed(data) {
    return new EmbedBuilder(data);
  }

  button(data) {
    return new ButtonBuilder(data);
  }

  menu(data) {
    return new StringSelectMenuBuilder(data);
  }

  row(data) {
    return new ActionRowBuilder(data);
  }

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
    require("../scripts/slashCommand")(this);
  }
}

module.exports = { BotClient };