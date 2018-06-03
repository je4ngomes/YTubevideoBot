const { randomId, genDownloadLink, pipe } = require('../utils/utils');
const Markup = require('telegraf/markup');

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
    reply_markup: pipe([getDownloadLinks, inlineKeyBoard, Markup.inlineKeyboard])(item.id.videoId),
    input_message_content: { 
                message_text: `${item.snippet.title}\nhttps://www.youtube.com/watch?v=${item.id.videoId}` 
        }
});

const getDownloadLinks = id => [genDownloadLink('videos', id), genDownloadLink('mp3', id)];
const inlineKeyBoard = ([videoUrl, audioUrl]) => [
        Markup.urlButton('⬇️ Video', videoUrl), 
        Markup.urlButton('⬇️ Audio', audioUrl)
];

module.exports = {
    formatResults
};