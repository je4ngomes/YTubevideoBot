const { searchVideo } = require('../models/youtube');
const { formatResults } = require('../actions/inline');

const inlineQuery = ({ inlineQuery, answerInlineQuery }) => {
    searchVideo(inlineQuery.query, 5)
        .then(formatResults)
        .then(answerInlineQuery)
        .catch(_ => console.error(_));
};

module.exports = {
    inlineQuery
};
