const path = require('path');
const bcrypt = require('bcrypt');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
            id: 1,
            name: 'Rikard Jansson',
            email: 'jkamzi@hotmail.co.uk',
            password: bcrypt.hashSync(
              'password',
              parseInt(process.env.BCRYPT_ROUNDS, 10)
            )
        }
      ]);
    });
};
