const Telegraf = require('telegraf');

require('../config/env').config(__dirname + './../.env');
const { inlineQuery } = require('./inlineHandler');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => ctx.reply('Hi! Unfortunately i only have support for inline mode. More feature will come stay tuned!'));
bot.on('inline_query', inlineQuery);

bot.startPolling();