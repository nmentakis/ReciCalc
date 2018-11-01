
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('ingredients', function(table) {
    table.string('std_measure').notNull().defaultTo('g').alter();
  })
  .alterTable('recipe_ingredients', function(table) {
    table.string('quantity_measure').notNull().defaultTo('g').alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('ingredients', function(table) {
    table.string('std_measure').notNull().alter();
  })
  .alterTable('recipe_ingredients', function(table) {
    table.string('quantity_measure').defaultTo(null).alter();
  })
};
