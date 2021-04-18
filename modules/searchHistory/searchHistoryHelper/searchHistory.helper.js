const {
    searchHistoryModel,
} = require('../../../dbModels/modules/index');

const {
    RESPONSE_CODES,
} = require('../../../utils/constant');

/**
 * @description Get recent search data of user matching query text 
 */
const getSearchHistroy = async ({ params, authorId }) => {
    const searchResults = await searchHistoryModel.findHistroyMacthingSearchText({ searchQuery: params, authorId });
    let replyText = '';
    let statusCode = RESPONSE_CODES.SUCCESS;
    if (searchResults.length) {
        replyText = `Recent search history matches\n\n`;
    }
    searchResults.forEach((search, index) => {
        replyText = replyText + `${index + 1}. ${search.searchQuery} \n`;
    });

    if (!replyText) {
        replyText = 'No results found';
        statusCode = RESPONSE_CODES.NOT_FOUND;
    }
    return { replyText, status: statusCode };
};

/**
 * @description Save user recent search history 
 */
const saveSearchHistroy = async ({ authorId, searchQuery }) => {
    const checkExistingText = await searchHistoryModel.findExistingSearchQuery({ authorId, searchQuery });
    if (checkExistingText) {
        return;
    }
    const searchHistoryObj = new searchHistoryModel({
        authorId,
        searchQuery
    });
    await searchHistoryObj.createSearchHistory();
}

module.exports = {
    getSearchHistroy,
    saveSearchHistroy,
}