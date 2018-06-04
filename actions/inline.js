const { randomId, genDownloadLink, pipe } = require('../utils/utils');
const Markup = require('telegraf/markup');
const Telegraf = require('telegraf');

const formatResults = data => data.items.filter(videoKind).map(formatObj);
const videoKind = item => item.id.kind === 'youtube#video';
const formatObj = item => ({
    type: 'video',
    id: randomId(),
    title: item.snippet.title,
    mime_type: 'video/mp4',
    description: item.snippet.description,
    thumb_url: item.snippet.thumbnails.default.url,
    video_url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    reply_markup: reply_markup(item.id.videoId),
    //reply_markup: ,
    input_message_content: { 
                message_text: `${item.snippet.title}\nhttps://www.youtube.com/watch?v=${item.id.videoId}` 
        }
});

const reply_markup = videoId => 
    Telegraf.Extra
        .markdown()
        .markup(m => m.inlineKeyboard([m.callbackButton('Download', videoId)])).reply_markup;

const getDownloadLinks = id => [genDownloadLink('videos', id), genDownloadLink('mp3', id)];
const editReplyMarkup = id => pipe([getDownloadLinks, inlineKeyBoard, Markup.inlineKeyboard])(id);
const inlineKeyBoard = ([videoUrl, audioUrl]) => [
        Markup.urlButton('⬇️ Video', videoUrl), 
        Markup.urlButton('⬇️ Audio', audioUrl)
];

module.exports = {
    formatResults,
    editReplyMarkup
};