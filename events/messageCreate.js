module.exports = async (client, message) => {
  // Botların mesajlarını yok say
  if (message.author.bot) return;

  // Sunucu dışı mesajları yok say (DM vs)
  if (!message.guild) return;

  // Basit küfür listesi - kendi istediğin kelimelerle değiştir
  const kufurler = ['aptal', 'salak', 's.*']; // örnek kelimeler, düzenle

  // Mesaj içeriğini küçük harfe çevir ve küfür kontrolü yap
  const msg = message.content.toLowerCase();

  if (kufurler.some(kelime => msg.includes(kelime))) {
    try {
      await message.delete(); // Mesajı sil
      await message.channel.send(`${message.author}, küfür yasak! Lütfen saygılı ol.`); // Uyarı mesajı
    } catch (error) {
      console.error('Mesaj silinirken hata:', error);
    }
  }
};
