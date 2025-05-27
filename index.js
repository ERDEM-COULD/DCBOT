require('dotenv').config(); // .env dosyasını yükler

const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// Discord bot ayarları
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Bot hazır olduğunda çalışır
client.once('ready', () => {
  console.log(`✅ Bot başarıyla giriş yaptı: ${client.user.tag}`);
});

// Mesajları dinler
client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    message.channel.send('🏓 Pong!');
  }

  if (message.content === '!yardım') {
    message.channel.send('Komutlar: !ping, !yardım');
  }
});

// Bot token ile giriş
client.login(process.env.TOKEN).catch(err => {
  console.error('❌ Bot giriş hatası:', err);
});

// Express ile Replit "uyandırma" servisi
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot aktif 🟢');
});

app.listen(PORT, () => {
  console.log(`🌐 Express sunucu çalışıyor: http://localhost:${PORT}`);
});
