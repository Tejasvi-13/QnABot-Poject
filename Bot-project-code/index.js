require('dotenv').config();
const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { MyBot } = require('./bot');

const server = restify.createServer();
const PORT = process.env.PORT || 3978;
server.listen(PORT, () => {
  console.log(`\nBot is running on http://localhost:${PORT}`);
});

const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword,
});

const bot = new MyBot();

server.post('/api/messages', async (req, res) => {
  await adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});
