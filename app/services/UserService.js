/**
 * Objection is very chained and can be hard to mock.
 * Creating services allow for easier testing.
 */
const User = require('../models/user');

/**
 * Find a user by a given field and value.  Wil return 1 result only
 */
const findByField = async (field, value) => {
  return User
    .query()
    .where(field, value)
    .limit(1)
    .first();
};

const findById = async (id) => {
  return await findByField('id', id);
};

module.exports = { findByField, findById };
