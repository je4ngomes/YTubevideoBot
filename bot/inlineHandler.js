const { searchVideo } = require('../models/youtube');
const { formatResults, editReplyMarkup } = require('../actions/inline');

const inlineQuery = ({ inlineQuery, answerInlineQuery, message }) => {
    searchVideo(inlineQuery.query, 5)
        .then(formatResults)
        .then(answerInlineQuery)
        .catch(_ => console.error(_.Error));
};

module.exports = {
    inlineQuery,
    editReplyMarkup
};