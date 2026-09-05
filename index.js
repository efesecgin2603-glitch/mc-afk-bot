const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'smp113.falixsrv.me', // IP adresin ayarlandı
    port: 25565,                // Varsayılan port
    username: 'AFK_Bot_724',
    version: false
  });

  bot.on('spawn', () => {
    console.log('Bot sunucuya başarıyla girdi!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 1000);
    }, 30000); // 30 saniyede bir zıplar
  });

  bot.on('end', () => {
    console.log('Bağlantı koptu, 5 saniye sonra tekrar deneniyor...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => console.log(err));
}

createBot();
