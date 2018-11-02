
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipe_ingredients', function(table) {
    table.increments('id').primary();
    table.integer('recipe_id').notNull();
    table.foreign('recipe_id').references('recipes.id');
    table.integer('food_no').notNull();
    table.foreign('food_no').references('ingredients.ndbno');
    table.decimal('quantity');
    table.text('quantity_measure');
    table.integer('list_position');
  });
  
};

//  recipe_ingredients SCHEMA:
//    id SERIAL PRIMARY KEY,
//    recipe_id INT, 
//    food_no INT, 
//    quantity NUMERIC,
//    quantity_measure VARCHAR,
//    list_position INT,
//    FOREIGN KEY food_no REFERENCES ingredients(ndbno),
//    FOREIGN KEY recipe_id REFERENCES recipes(id)

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipe_ingredients');
};
