const fetch = require('node-fetch');

const searchVideo = (query='', limiter) =>
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${limiter}&q=${query}&key=${process.env.YT_KEY}`)
        .then(res => res.json())
        .catch(_ => {
            throw 'API error while fetching the data.'
        });

module.exports = {
    searchVideo
}
