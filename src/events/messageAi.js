const { ChannelType, AttachmentBuilder } = require("discord.js");
const { ApexAI } = require('apexify.js');

module.exports = new Object({
  name: "messageCreate",
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").Message} message
   */
  async execute(client, message) {

    if (message.author.bot || message.channel.type === ChannelType.DM) return;

    if (client.config.aiChatChannel.includes(message.channel.id)) {
        const aiOptions = {
          chat: {
            enable: true,
            chatModel: "chatgpt-4o-latest",
            readFiles: true,
            readImages: true,
            instruction: 'Your name is Luna. You were born as a relic and a wisdom keeper of Ancient Luna sanctuary by the ancestor',
            memory: {
              memoryOn: true,
              id: message.author.id
            },
            typeWriting: {
              enable: false,
              speed: 50,
              delay: 500,
            }
          },
          others: {
            messageType: {
              type: 'send', // 'send' or 'reply'
              intialContent: `<@${message.author.id}>`,
              sendAs: 'content',
            },
          }
        };
        await ApexAI(message, aiOptions)
      }
  },
});
