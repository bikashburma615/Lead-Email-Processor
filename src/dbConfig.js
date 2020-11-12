require('dotenv').config({ path: __dirname + '/../.env' });

// Default configuration for database connection
let connection = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  authSource: process.env.DB_AUTH_SOURCE,
  charset: 'utf8',
  timezone: 'UTC',
};

// For test environment
if (process.env.NODE_ENV === 'test') {
  connection = {
    ...connection,
    port: process.env.TEST_DB_PORT,
    host: process.env.TEST_DB_HOST,
    user: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
  };
}

/**
 * Database configuration.
 */
module.exports = {
  connection,
  client: process.env.DB_CLIENT,
};
