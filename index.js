const mineflayer = require('mineflayer');

const BOT_PASSWORD = 'AfkBotPassword123!';

function createBot() {
  const bot = mineflayer.createBot({
    host: 'smp113.falixsrv.me',
    port: 25565,
    username: 'AFK_Bot_724',
    version: '1.20.4', // Sunucunun istediği tam sürüm (Protokol 26.2 / 765)
    checkTimeoutInterval: 60 * 1000
  });

  bot.on('spawn', () => {
    console.log('Bot sunucuya başarıyla girdi!');

    // Otomatik Kayıt & Giriş
    setTimeout(() => {
      bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
      bot.chat(`/login ${BOT_PASSWORD}`);
    }, 3000);

    // Zıplama hareketi (15 saniyede bir)
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 1000);
    }, 15000);

    // Etrafa bakma (10 saniyede bir)
    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, true);
    }, 10000);

    // İleri-geri adım (20 saniyede bir)
    setInterval(() => {
      bot.setControlState('forward', true);
      setTimeout(() => {
        bot.setControlState('forward', false);
        bot.setControlState('back', true);
        setTimeout(() => bot.setControlState('back', false), 800);
      }, 800);
    }, 20000);
  });

  bot.on('end', () => {
    console.log('Bağlantı koptu, 5 saniye sonra tekrar deneniyor...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => console.log('Hata oluştu:', err));
}

createBot();
