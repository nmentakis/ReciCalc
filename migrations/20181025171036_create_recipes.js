
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', function(table) {
    table.increments('id').unsigned().primary();
    table.string('name').notNull();
    table.text('description');
    table.text('top_ingredients');
    table.json('instructions');
    table.timestamps();
  });
};

//  recipes SCHEMA:
//    id SERIAL PRIMARY KEY,
//    name VARCHAR NOT NULL,
//    description TEXT,
//    top_ingredients TEXT,
//    instructions JSON,
//  

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipes');
};
