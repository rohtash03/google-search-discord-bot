const {
    BOT: BOT_CONSTANTS,
    RESPONSE_CODES,
} = require('../../../utils/constant');

const {
    sendResponse
} = require('../../../utils/responseHelper');
const {
    getCommandAndParams,
    processGenericMessages,
    getCommandFunctionMap,
} = require('./botMessage.helper');

/**
 * @description Function to consume user message and reply accordingly
 * @param {Object} messageObject
 * @param {string} messageObject.messageText User text input
 * @param {Object} messageObject.author Author data object
 * @returns {{ reply: Boolean, message: String, status: Number }} 
 */
const messageConsumer = async ({ messageText, author }) => {
    try {
        const responseObj = {
            reply: true,
            message: '',
            status: RESPONSE_CODES.SUCCESS,
        };

        if (author.bot) {
            responseObj.reply = false;
            return responseObj;
        }

        if (!messageText.startsWith(BOT_CONSTANTS.COMMAND_PREFIX)) {
            const { replyText, status } = await processGenericMessages({ messageText });
            responseObj.message = replyText;
            responseObj.status = status;
            return sendResponse(responseObj);
        }

        const {
            command,
            params
        } = getCommandAndParams({ messageText });

        // Get map of command and corresponding function to run
        const commandsMap = getCommandFunctionMap();
        const commandFuncion = commandsMap[command];
        if (!commandFuncion) {
            responseObj.message = `Command not found. Available commands - ${Object.keys(commandsMap).join(', ')}`;
            responseObj.status = RESPONSE_CODES.NOT_FOUND;
            return sendResponse(responseObj);
        }

        if (!params) {
            responseObj.message = 'No params passed with command. Format ![command] [param]';
            responseObj.status = RESPONSE_CODES.BAD_REQUEST;
            return sendResponse(responseObj);
        }

        const { replyText, status } = await commandFuncion({ params, authorId: author.id });
        responseObj.message = replyText;
        responseObj.status = status;
        return sendResponse(responseObj);
    } catch (error) {
        console.log(error);
        const responseObj = {
            reply: true,
            message: 'Something went wrong. Please try again.',
            status: RESPONSE_CODES.FAILURE,
        };
        return sendResponse(responseObj);   
    }
};

module.exports = {
    messageConsumer,
}