const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');

const { 
    randomId,
    genYoutubeLink,
    genDownloadLink, 
    pipe 
} = require('../utils/utils');

const formatResults = data => data.items.filter(videoKind).map(formatObj);
const videoKind = item => item.id.kind === 'youtube#video';
const formatObj = item => ({
    type: 'video',
    id: randomId(),
    title: item.snippet.title,
    mime_type: 'video/mp4',
    description: item.snippet.description,
    thumb_url: item.snippet.thumbnails.default.url,
    video_url: genYoutubeLink(item.id.videoId),
    reply_markup: reply_markup(item.id.videoId),
    input_message_content: { 
                message_text: `${item.snippet.title}\n${genYoutubeLink(item.id.videoId)}` 
        }
});

const editReplyMarkup = _ => 
    Markup.inlineKeyboard([
        Markup.urlButton('Download Ready', 'https://t.me/joinchat/AAAAAEpqUEEIzw4Fpjpjrg')
]);
const reply_markup = videoId => 
    Telegraf.Extra
        .markdown()
        .markup(m => m.inlineKeyboard([m.callbackButton('Download', videoId)])).reply_markup;

const getDownloadLinks = id => [genDownloadLink('videos', id), genDownloadLink('mp3', id)];
const inlineKeyBoard = ([videoUrl, audioUrl]) => [
        Markup.urlButton('⬇️ Video', videoUrl), 
        Markup.urlButton('⬇️ Audio', audioUrl)
];

const sendChannelPost = bot => 
    id => bot.telegram.sendMessage(
        '-1001248481345', 
        `${genYoutubeLink(id)}`,
        {
            reply_markup: pipe([getDownloadLinks, inlineKeyBoard, Markup.inlineKeyboard])(id)
        }
);

module.exports = {
    formatResults,
    editReplyMarkup,
    sendChannelPost
};
