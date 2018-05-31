const isYoutubeLink = require('../utils/link');
const { 
    fetchAudio, 
    sendAudio, 
    deleteAudio 
} = require('../actions/audio');


module.exports = (ctx) => {
    isYoutubeLink(ctx.message.text)
        .then(fetchAudio)
        .then(sendAudio(ctx))
        .then(deleteAudio)
        .catch(err => ctx.reply(err.msg));
};