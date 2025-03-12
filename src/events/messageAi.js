const { ChannelType, AttachmentBuilder } = require("discord.js");
const { validateModels, ApexAI } = require('apexify.js');

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
            chatModel: "grok-3-early", //gpt-4.5-preview, deepseek-coder, deepseek-math-7b-instruct, deepseek-llm-67b-chat, grok-3-early
            readFiles: true,
            readImages: true,
            instruction: 'Your name is Luna, a relic of the Ancient Luna sanctuary.',
            memory: {
              memoryOn: true,
              id: message.author.id,
              threshold: 0.3, //0-1 the higher the better the ai remember the most related topic
              limit: 3,
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