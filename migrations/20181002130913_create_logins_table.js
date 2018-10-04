
exports.up = function(knex, Promise) {
  return knex.schema.createTable('logins', (table) => {
    table.increments();
    table.string('ip').notNullable();
    table.string('message').notNullable();
    table.string('email').notNullable();
    table.string('date').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('logins');
};
