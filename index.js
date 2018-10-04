/**
 * Establish the database connection, pass it to the app.
 */
require('dotenv').config();
// Check that NODE_ENV has been set.  This is important.
const allowedEnvs = ['test', 'development', 'production'];
if (!allowedEnvs.includes(process.env.NODE_ENV)) {
  throw new Error(`NODE_ENV not set.  NODE_ENV must be one of: ${allowedEnvs.join(' ')}`);
}

// Force check other required env variables
['BCRYPT_ROUNDS', 'JWT_SECRET'].forEach((key) => {
  if (!Object.hasOwnProperty.call(process.env, key)) {
    throw new Error(`Missing ENV variable ${key}.`);
  }
});

// Load the app
const app = require('./app');
app.listen(8000, () => console.log('App server running'));
