
exports.up = function (knex, Promise) {
  return knex.schema.createTable('contacts', (table) => {
    table.increments().notNullable();
    table.string('name', 255).notNullable();
    table.timestamps(true, true);
    table.string('address', 255);
    table.string('mobile', 20);
    table.string('work', 20);
    table.string('home', 20);
    table.string('email', 100);
    table.string('twitter', 255);
    table.string('instagram', 255);
    table.string('github', 255);
    table.integer('created_by').references('id').inTable('users').notNullable().onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contacts');
};
