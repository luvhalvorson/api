// Update with your config settings.
const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: path.join(__dirname, 'database', 'database.sqlite'),
    }
  },
  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      // filename: path.join(__dirname, 'database', 'test.db'),
      filename: ':memory:'
    },
  },

};
