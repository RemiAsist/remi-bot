const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Crea el cliente con sesión persistente
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// Muestra el QR en consola
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('Escanea el QR para vincular WhatsApp');
});

// Mensaje cuando esté listo
client.on('ready', () => {
  console.log('✅ Remi está conectado y listo 😎');
});

// Escucha mensajes entrantes
client.on('message', async (msg) => {
  const texto = msg.body.toLowerCase();

  if (texto.includes('hola')) {
    msg.reply('¡Wena bro! Soy Remi, tu asistente. ¿En qué te ayudo hoy? 😄');
  }
});

client.initialize();
