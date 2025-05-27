const { Events, Collection } = require('discord.js');

const kullanıcıMesajları = new Collection();
const SPAM_SÜRE = 5000; // 5 saniye
const MAKS_MESAJ = 5; // 5 mesajdan fazlası spam sayılır

module.exports = {
  name: Events.MessageCreate,
  once: false,

  execute(message) {
    if (message.author.bot) return;

    const now = Date.now();
    const userId = message.author.id;

    if (!kullanıcıMesajları.has(userId)) {
      kullanıcıMesajları.set(userId, []);
    }

    const zamanlar = kullanıcıMesajları.get(userId);
    zamanlar.push(now);

    // Eski mesajları temizle
    const filtrelenmişZamanlar = zamanlar.filter(zaman => now - zaman < SPAM_SÜRE);
    kullanıcıMesajları.set(userId, filtrelenmişZamanlar);

    if (filtrelenmişZamanlar.length > MAKS_MESAJ) {
      message.delete().catch(() => {});
      message.channel.send(`${message.author}, lütfen spam yapma! 🚫`).then(msg => {
        setTimeout(() => msg.delete().catch(() => {}), 5000);
      });
    }
  }
};
