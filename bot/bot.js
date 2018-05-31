const Telegraf = require('telegraf');

const handler = require('./handler');

process.env.BOT_TOKEN = '428427082:AAE3-Y8XFRb4UXXJLcLwa2oFvDAxNnEzZJo';
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => ctx.reply('Send me a youtube link and i will send you the audio file.'));
bot.on('text', handler);


bot.startPolling();