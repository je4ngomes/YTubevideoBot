const { searchVideo } = require('../ytApi/api');
const { formatResults } = require('../actions/inline');
const { fetchMultiAudio } = require('../actions/audio');


const inlineQuery = ({ inlineQuery, answerInlineQuery }) => {
    searchVideo(inlineQuery.query, 4)
        .then(formatResults)
        .then(fetchMultiAudio)
        .then(answerInlineQuery)
        .catch(_ => {
            console.log(_);
        });
};

module.exports = {
    inlineQuery
};