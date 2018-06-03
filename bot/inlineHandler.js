const { searchVideo } = require('../models/youtube');
const { formatResults } = require('../actions/inline');

const inlineQuery = ({ inlineQuery, answerInlineQuery }) => {
    searchVideo(inlineQuery.query, 5)
        .then(formatResults)
        .then(answerInlineQuery)
        .catch(_ => {

            throw 'inline Error';
        });
};

module.exports = {
    inlineQuery
};
