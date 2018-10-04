const { connection } = require('../config');
const { Model } = require('objection');

Model.knex(connection);

module.exports = Model;
