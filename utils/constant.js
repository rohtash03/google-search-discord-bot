const constants = {
    BOT: {
        COMMAND_PREFIX: '!'
    },
    GENERIC_MESSAGES: [
        {
            INPUT: ['hi', 'hello', 'hey'],
            OUTPUT: 'hey'
        }
    ],
    GOOGLE_SEARCH_RESULTS: {
        RESULTS_LIMIT: 5
    },
    RESPONSE_CODES: {
        SUCCESS: 200,
        NOT_FOUND: 404,
        FAILURE: 500 ,
        BAD_REQUEST: 400  
    }
};

module.exports = constants;