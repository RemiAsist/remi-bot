const venom = require('venom-bot');
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

venom
  .create({
    session: 'remi-bot',
    multidevice: true,
    headless: true,
    useChrome: false
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    if (!message.isGroupMsg) {
      const userPrompt = message.body;
      try {
        const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Eres Remi, un bot asistente simpático que recuerda tareas y responde como un amigo cercano. Usa emojis de vez en cuando y mantén un tono casual y motivador.',
            },
            {
              role: 'user',
              content: userPrompt,
            },
          ],
        });

        const gptResponse = response.data.choices[0].message.content;
        await client.sendText(message.from, gptResponse);
      } catch (error) {
        console.error('Error con OpenAI:', error);
        await client.sendText(message.from, '😓 Uy, algo falló al conectar con ChatGPT.');
      }
    }
  });
}
