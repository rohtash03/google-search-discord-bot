/**
 * searchHistory model static methods
 * this here refers to searchHistory model itself
 */

/* eslint-disable func-names */

const findHistroyMacthingSearchText = function ({ searchQuery, projections = {} }) {
  return this.find({ $text: { $search: searchQuery } }, projections).sort({ _id : -1 }).limit(5);
};

const findExistingSearchQuery = function ({ searchQuery, authorId }) {
  return this.count({ authorId, searchQuery });
};

const schemaFunction = (searchHistorySchema) => {
  /* eslint-disable no-param-reassign */
  searchHistorySchema.statics.findHistroyMacthingSearchText = findHistroyMacthingSearchText;
  searchHistorySchema.statics.findExistingSearchQuery = findExistingSearchQuery;
};

module.exports = schemaFunction;
