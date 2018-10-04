const { factory } = require('factory-girl');
const ObjectionAdapter = require('factory-girl-objection-adapter');
const faker = require('faker');

/**
 * Model import
 */
const { User } = require('../../app/models');

factory.setAdapter(new ObjectionAdapter());

/**
 * User factory
 */
if (!factory.getFactory('user', false) ) {
  factory.define('user', User, {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
}

module.exports = factory;
