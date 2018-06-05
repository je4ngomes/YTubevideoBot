const randomId = () => '_' + Math.random().toString(36).substr(2, 9);

const genDownloadLink = (format, id) => `https://youtubemp3api.com/@api/button/${format}/${id}`;

const genYoutubeLink = id => `https://www.youtube.com/watch?v=${id}`;

const pipe = (funcs) => 
    arg => funcs.reduce((prev, curr) => curr(prev), arg);

module.exports = {
    randomId,
    pipe,
    genYoutubeLink,
    genDownloadLink
};
