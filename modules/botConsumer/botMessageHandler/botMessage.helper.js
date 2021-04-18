const {
    BOT: BOT_CONSTANTS,
    GENERIC_MESSAGES,
    RESPONSE_CODES,
} = require('../../../utils/constant');

const {
    customGoogleSearch,
} = require('../../searchResults/googleCustomSearch/googleCustomSearch.service');

const {
    getSearchHistroy,
} = require('../../searchHistory/searchHistoryHelper/searchHistory.helper');

/**
 * @description Function to direct input output messages like hi -> hey  
 */
const processGenericMessages = async ({ messageText }) => {
    let replyText;
    let status;
    GENERIC_MESSAGES.forEach(element => {
        if (element.INPUT.includes(messageText)) {
            replyText = element.OUTPUT;
            status = RESPONSE_CODES.SUCCESS;
        }
    });
    if (!replyText) {
        replyText = 'Unable to understand that. Try Hi or ![command] [param]';
        status = RESPONSE_CODES.NOT_FOUND;
    }
    return { replyText, status };
};

/**
 * @description Takes string "!google abc" and returns command - google and params - abc 
 */
const getCommandAndParams = ({ messageText }) => {
    const commandBody = messageText.slice(BOT_CONSTANTS.COMMAND_PREFIX.length);
    const indexOfSpace = commandBody.indexOf(' ');
    if( indexOfSpace === -1) {
        return {
            command: commandBody,
            params: ''
        }
    }
    const command = commandBody.substr(0, indexOfSpace);
    const params = commandBody.substr(indexOfSpace + 1).trim();
    return {
        command,
        params
    }
};

/**
 * @description Get map of command and corresponding function to run
 */
const getCommandFunctionMap = () => {
    const commandMap = {
        google: customGoogleSearch,
        recent: getSearchHistroy
    };
    return commandMap;
}

module.exports = {
    getCommandAndParams,
    processGenericMessages,
    getCommandFunctionMap,
}