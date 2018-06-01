const fs = require('fs');
const ytdl = require('ytdl-core');
const path = require('path');

const { joinPath } = require('../utils/utils');

const fetchSingleAudio = ({ url, filename }) => {
    return new Promise((resolve, reject) => {
        ytdl(url, {quality: "highestaudio",  filter: 'audioonly'})
            .pipe(fs.createWriteStream(joinPath(`../tmp/${filename}.mp3`)))
            .on('error', _ => reject({msg: 'Something went wrong. Please try again.'}))            
            .on('finish', () => {
                resolve(joinPath(`../tmp/${filename}.mp3`));
            });
    });   
};

const fetchMultiAudio = targets => 
    Promise.all(
        targets.map(async target => 
            ({...target, audio_url: fs.createReadStream(await fetchSingleAudio({ url: target.audio_url, filename: target.title }))})
    ));

const deleteAudio = () => {
    console.log(joinPath('../tmp/'));
    fs.readdirSync(joinPath('../tmp/'))
        .map(file => fs.unlinkSync(joinPath(`../tmp/${file}`)));
    }
const sendAudio = ctx => {
    return (filename) => {       
        ctx.replyWithAudio({source: filename}, {
            reply_to_message_id: ctx.message.message_id
        });
    };
};

const audioInfo = url => 
    ytdl.getInfo(url)
        .then(info => ({url: info.video_url, filename: info.title}));


module.exports = {
    deleteAudio,
    sendAudio,
    audioInfo,
    fetchSingleAudio,
    fetchMultiAudio
};