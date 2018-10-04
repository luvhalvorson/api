const Knex = require('knex');
const config = require('../../knexfile')[process.env.NODE_ENV];

const connection = Knex(config);

module.exports = connection;
