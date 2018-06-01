const formatResults = (data) => data.items.map(formatObj);

const formatObj = item => ({
    type: 'audio',
    id: randomId(),
    title: item.snippet.title,
    audio_url: `https://www.youtube.com/watch?v=${item.id.videoId}`
});

const randomId = () => '_' + Math.random().toString(36).substr(2, 9);


module.exports = {
    formatResults
};