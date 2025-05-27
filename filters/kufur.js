const { Events } = require('discord.js');

// Basit küfür listesi (geliştirilebilir)
const kufurler = [
  "salak", "aptal", "oç", "amk", "siktir", "orospu", "piç", "ananı", "anan"
];

module.exports = {
  name: Events.MessageCreate,
  once: false,

  execute(message) {
    // Bot mesajlarını yoksay
    if (message.author.bot) return;

    // Mesajdaki kelimeleri kontrol et
    const mesaj = message.content.toLowerCase();

    for (const kufur of kufurler) {
      if (mesaj.includes(kufur)) {
        message.delete().catch(err => console.log("Mesaj silinemedi:", err));
        message.channel.send(`${message.author}, küfür etme! 🚫`).then(msg => {
          setTimeout(() => msg.delete().catch(() => {}), 5000); // 5 sn sonra uyarı silinsin
        });
        break;
      }
    }
  }
};
