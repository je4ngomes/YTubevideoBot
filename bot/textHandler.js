const isYoutubeLink = require('../utils/link');
const { 
    fetchSingleAudio, 
    sendAudio,
    audioInfo,
    deleteAudio 
} = require('../actions/audio');


const textHandler = (ctx) => {
    isYoutubeLink(ctx.message.text)
        .then(audioInfo)
        .then(fetchSingleAudio)
        .then(sendAudio(ctx))
        .then(deleteAudio)
        .catch(err => console.log(err));
};

module.exports = {
    textHandler
};