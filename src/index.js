const { BotClient } = require('./structures/BotClient');
const client = new BotClient();
module.exports = client;
require("./handlers/antiCrash")(client);