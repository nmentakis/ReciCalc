
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').unique();
    table.string('password');
  })
  .createTable('recipes', function(table) {
    table.increments('id').unsigned().primary();
    table.string('name').notNull();
    table.text('description');
    table.text('ingredients');
    table.json('instructions');
    table.integer('user_id').references('id').inTable('users').notNull();
    table.timestamps();
  })

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('recipes'),
    knex.schema.dropTableIfExists('users'),
  ]);
};