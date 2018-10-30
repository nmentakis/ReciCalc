
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ingredients', function(table) {
    table.integer('ndbno').primary();
    table.text('name').notNull();
    table.decimal('std_amount').notNull();
    table.text('std_measure').notNull();
    table.decimal('kcal_per');
    table.decimal('fat_per');
    table.decimal('sat_fat_per');
    table.decimal('fiber_per');
    table.decimal('cholesterol_per');
    table.decimal('sodium_per');
    table.decimal('carbs_per');
    table.decimal('sugar_per');
    table.decimal('protein_per'); 
  })
};

//  ingredients SCHEMA:
//    ndbno INT PRIMARY KEY,
//    name TEXT NOT NULL,
//    std_amount NUMERIC NOT NULL,
//    std_measure TEXT NOT NULL,
//    kcal_per NUMERIC,
//    fat_per NUMERIC,
//    sat_fat_per NUMERIC,
//    fiber_per NUMERIC,
//    cholesterol_per NUMERIC,
//    sodium_per NUMERIC,
//    carbs_per NUMERIC,
//    sugar_per NUMERIC,
//    protein_per NUMERIC

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ingredients');
};
