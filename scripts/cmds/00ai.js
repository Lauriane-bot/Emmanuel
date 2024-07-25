 const axios = require('axios');

const Prefixes = [
  'ai',
  'anjara',
  'Aesther',
];

module.exports = {
  config: {
    name: "ai",
    version: "1",
    author: "aesther",
    longDescription: "Command with no prefix\n💬 - LLaMA, a large language model developed by Meta AI that can understand and respond to human input in a conversational manner. I'm a type of artificial intelligence designed to generate human-like text responses.",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {
    // Initialization logic here if needed
  },
  onChat: async function ({ api, event, args, message }) {
    try {
      // Check if the message starts with a valid prefix
      const prefix = Prefixes.find((p) => event.body && event.body.trim().toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Ignore the command if prefix is not recognized
      }

      // Extract the question from the message
      const prompt = event.body.substring(prefix.length).trim();
const senderID = event.senderID;
      const senderInfo = await api.getUserInfo([senderID]);
      const senderName = senderInfo[senderID].name; 
      if (!prompt) {
        await message.reply(`🌸𝙎𝘼𝙉𝘾𝙃𝙊𝙆𝙐𝙄𝙉🌸 :\n\nHello ${senderName} ⁉️` );
        api.setMessageReaction("⁉️", event.messageID, () => {}, true);
        return;
      }

      // Make a GET request to the AI API
      const response = await axios.get(`https://markdevs-last-api-as2j.onrender.com/api/gpt4o?q=${encodeURIComponent(prompt)}`);
      const answer = response.data.response;

      await message.reply(`🌸𝙎𝘼𝙉𝘾𝙃𝙊𝙆𝙐𝙄𝙉🌸 :\n[💬] ${senderName}\n\n${answer} 🩷`);
      api.setMessageReaction("💬", event.messageID, () => {}, true);

    } catch (error) {
      console.error("Error:", error.message);
      await message.reply("Sorry, I couldn't process your question at the moment.");
    }
  }
};
