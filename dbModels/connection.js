const mongoose = require('mongoose');

const VALIDATE_PROPERTIES = ['host', 'port', 'database'];

function validateConfig(config) {
  if (!config) {
    throw new Error('Invalid initialization of mongodb, missing config.');
  }

  if (!config.db || VALIDATE_PROPERTIES.reduce((b, x) => b || !config.db[x], false)) {
    throw new Error('Invalid initialization of mongodb, missing database credentials.');
  }
}

/**
 * @description function to initialise mongo connnection
 * @param {object} config
 * @param {object} config.db - consists of host, port, database, username, password
 */
function mongoInit(config) {
  validateConfig(config);
  const { db } = config;
  const connectionString = `mongodb+srv://${encodeURIComponent(db.host)}/${encodeURIComponent(db.database)}`;

  const options = {
    user: db.username,
    pass: db.password,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running.', err);
    process.exit();
  });

  /**
   * Enable debug mode to log all queries running on database
   */
  mongoose.set('debug', true);

  mongoose.connect(connectionString, options, () => {
    console.log('Successfully connected to db.');
  });
}

module.exports = {
  mongoInit,
};
