const { randomId } = require('../utils/utils');

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
    input_message_content: { 
                message_text: `${item.snippet.title}\nhttps://www.youtube.com/watch?v=${item.id.videoId}` 
        }
});


module.exports = {
    formatResults
};