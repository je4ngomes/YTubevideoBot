const fetch = require('node-fetch');

const searchVideo = (query='', resultsLimit) => {
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultsLimit}&q=${query}&key=${process.env.YT_KEY}`)
            .then(res => res.json())
            .catch(_ => {
                throw 'API error while fetching the data.'
            });
};

module.exports = {
    searchVideo
}