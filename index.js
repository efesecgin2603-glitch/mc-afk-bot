const mineflayer = require('mineflayer');

const BOT_PASSWORD = 'AfkBotPassword123!'; // Botun sunucudaki şifresi

function createBot() {
  const bot = mineflayer.createBot({
    host: 'smp113.falixsrv.me',
    port: 25565,
    username: 'AFK_Bot_724',
    version: '1.20.1'
  });

  bot.on('spawn', () => {
    console.log('Bot sunucuya başarıyla girdi!');

    // 1. Otomatik Kayıt ve Giriş Yapma
    setTimeout(() => {
      bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
      bot.chat(`/login ${BOT_PASSWORD}`);
    }, 2000); // Sunucuya girdikten 2 saniye sonra komutları gönderir

    // 2. Zıplama hareketi (15 saniyede bir)
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 1000);
    }, 15000);

    // 3. Etrafa bakma hareketi (10 saniyede bir)
    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, true);
    }, 10000);

    // 4. İleri-geri küçük adımlar (20 saniyede bir)
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
