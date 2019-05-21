
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments().notNullable();
    table.string('username', 50).notNullable();
    table.string('password', 255).notNullable();
    table.string('name', 100);
    table.string('email', 100);
    table.string('address', 255);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
