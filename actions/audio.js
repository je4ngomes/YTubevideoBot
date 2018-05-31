const fs = require('fs');
const ytdl = require('ytdl-core');
const path = require('path');

const TMP_FILE = path.join(__dirname,'../tmp/audio.mp3');
const renameTo = info => {
    fs.renameSync(TMP_FILE, path.join(__dirname, `../tmp/${info.title}.mp3`));
    return info;
};

const fetchAudio = url => {
    console.log('a')
    return new Promise((resolve, reject) => {
        ytdl(url, {quality: "highestaudio",  filter: 'audioonly'})
            .pipe(fs.createWriteStream(TMP_FILE))
            .on('error', _ => reject({msg: 'Something went wrong. Please try again.'}))            
            .on('finish', () => {
                ytdl.getInfo(url)
                    .then(renameTo)
                    .then(info => resolve(path.join(__dirname, `../tmp/${info.title}.mp3`)));
            });
    });   
};

const deleteAudio = (filename) => fs.unlinkSync(filename);
const sendAudio = (ctx) => {
    return (filename) => {       
        ctx.replyWithAudio({source: filename}, {
            reply_to_message_id: ctx.message.message_id
        });
        return filename;
    };
};

module.exports = {
    deleteAudio,
    sendAudio,
    fetchAudio
};