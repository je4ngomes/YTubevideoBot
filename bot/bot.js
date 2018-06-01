const Telegraf = require('telegraf');

require('../config/env').config(__dirname + './../.env');
const { textHandler } = require('./textHandler');
const { inlineQuery } = require('./inlineHandler');

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.start(ctx => ctx.reply('Send me a youtube link and i will send you the audio file.'));
bot.on('text', textHandler);
bot.on('inline_query', inlineQuery);

bot.startPolling();