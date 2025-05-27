const { Events } = require('discord.js');

const reklamlar = [
  "discord.gg", ".com", ".net", "https://", "http://", "invite", "join"
];

module.exports = {
  name: Events.MessageCreate,
  once: false,

  execute(message) {
    if (message.author.bot) return;

    const içerik = message.content.toLowerCase();

    for (const kelime of reklamlar) {
      if (içerik.includes(kelime)) {
        message.delete().catch(() => {});
        message.channel.send(`${message.author}, reklam yapmak yasak! ❌`).then(msg => {
          setTimeout(() => msg.delete().catch(() => {}), 5000);
        });
        break;
      }
    }
  }
};
