const isYoutubeLink = (url) => {
    const PATTERN = /https?:\/\/(www.)?youtu(be)?.(com|be)/;

    return PATTERN.test(url) ? 
        Promise.resolve(url) : 
        Promise.reject({msg: 'This is not a youtube link! Please send me the correct one.'});     
};

module.exports = isYoutubeLink;