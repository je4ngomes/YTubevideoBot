const Telegraf = require('telegraf');
const { pipe } = require('../utils/utils');

require('../config/env').config(__dirname + './../.env');
const { inlineQuery } = require('./inlineHandler');
const { sendChannelPost, editReplyMarkup } = require('../actions/inline');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => ctx.reply('Hi! Unfortunately i only have support for inline mode. More feature will come stay tuned!'));

bot.on('inline_query', inlineQuery);

bot.on('callback_query', (ctx) => 
    pipe([
        sendChannelPost(bot),
        editReplyMarkup,
        ctx.editMessageReplyMarkup  
    ])(ctx.callbackQuery.data)
);

bot.startPolling();