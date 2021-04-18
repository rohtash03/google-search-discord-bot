/**
 * @description Common function to return response, more functionality can be added here
 */
const sendResponse = ({ status, message, reply }) => {
    return { status, message, reply };
}

module.exports = {
    sendResponse,
}