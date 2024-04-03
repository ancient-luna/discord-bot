// // Chat AI
// if (client.config.aiChatChannel.includes(message.channel.id)) {
//     const axios = require("axios");
//     const errorChat = "Try again, there was an issue getting that AI response <:write:1163568311716565154>";
//     const previousMessages = new Collection();
//     try {
//       let context = "generate a reply as you are chatbot developed by Dae";
//       let name = message.author.id;
//       let prompt = previousMessages.map((msg) => msg.content).join(" ") + message.content;
//       let loadingRspns = await message.channel.send(`thinking <a:_util_loading:863317596551118858>`);
//       // await message.channel.sendTyping();
//       setTimeout(async () => {
//         try {
//           let res1 = await axios.post(
//             "https://ai.spin.rip/chat",
//             { prompt, context, name },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             },
//           );
//           const replyMessage = `<@${name}> ${res1.data.response}`;
//           await loadingRspns.edit(replyMessage);
//         } catch (error) {
//           console.error(error);
//           await loadingRspns.edit(errorChat);
//         }
//       }, 10000); // 10s
//       previousMessages.set(message.id, message);
//       if (previousMessages.size > 0) {
//         const oldestMessage = previousMessages.first();
//         previousMessages.delete(oldestMessage.id);
//       }
//     } catch (error) {
//       console.error(error);
//       await loadingRspns.edit(errorChat);
//     }
//   }

// =========================================================================================

// // Chat AI
// if (client.config.aiChatChannel.includes(message.channel.id)) {
//     const axios = require("axios");
//     const errorChat = "Try again, there was an issue getting that AI response <:write:1163568311716565154>";
//     const encodedMessage = encodeURIComponent(message.content);
//     let loadingRspns = await message.channel.send(`thinking <a:_util_loading:863317596551118858>`);
//     const options = {
//         method: 'GET',
//         url: 'https://google-bard1.p.rapidapi.com/v3/chat/gemini-1.0-pro',
//         headers: {
//             'api-key': process.env.GOOGLE_MAKERSUITE_KEY,
//             message: encodedMessage,
//             'harm-category-harassment': 'BLOCK_MEDIUM_AND_ABOVE',
//             'harm-category-hate-speech': 'BLOCK_MEDIUM_AND_ABOVE',
//             'harm-category-sexually-explicit': 'BLOCK_MEDIUM_AND_ABOVE',
//             'harm-category-dangerous-content': 'BLOCK_MEDIUM_AND_ABOVE',
//             userid: process.env.GOOGLE_BARD_USERID,
//             history: 'true',
//             'X-RapidAPI-Key': process.env.X_RAPID_API,
//             'X-RapidAPI-Host': 'google-bard1.p.rapidapi.com'
//         }
//     };
//     try {
//         const replyChat = await axios.request(options);
//         const decodedResponse = decodeURIComponent(replyChat.data.response);
//         loadingRspns.edit(`<@${message.author.id}> ${decodedResponse}`)
//     } catch (error) {
//         console.error(error);
//         await loadingRspns.edit(`<@${message.author.id}> ${errorChat}`);
//     }
// };