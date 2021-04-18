/**
 * searchHistory model schema
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const searchHistorySchema = new Schema(
  {
    authorId: {
      type: String,
      trim: true,
      required: true,
    },
    searchQuery: { type: String, required: true },
  },
  { timestamps: true },
);

searchHistorySchema.index({ authorId: 1 });
searchHistorySchema.index({ searchQuery: 'text' });

/**
 * Import all static and instance methods defined in separate files
 */
require('./searchHistory.static.methods')(searchHistorySchema);
require('./searchHistory.instance.methods')(searchHistorySchema);

const searchHistoryModel = mongoose.model('searchHistory', searchHistorySchema, 'searchHistory');

module.exports = {
  searchHistoryModel,
};
