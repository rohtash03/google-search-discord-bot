/**
 * Single endpoint from which all db models can be imported
 */
const { searchHistoryModel } = require('./searchHistory/searchHistory.model');

module.exports = {
  searchHistoryModel,
};
