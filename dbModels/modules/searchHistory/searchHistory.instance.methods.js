/**
 * Instance methods of searchHistory model
 * this here refers to instance of searchHistory model
 */

/* eslint-disable func-names */

const createSearchHistory = function () {
  return this.save();
};

const schemaFunction = (searchHistorySchema) => {
  /* eslint-disable no-param-reassign */
  searchHistorySchema.methods.createSearchHistory = createSearchHistory;
};

module.exports = schemaFunction;
