/*
 * Proposed schemata:
 * 
 * recipes SCHEMA:
 *   id SERIAL PRIMARY KEY,
 *   name VARCHAR NOT NULL,
 *   description TEXT,
 *   top_ingredients TEXT,
 *   instructions JSON,
 * 
 * 
 * ingredients SCHEMA:
 *   ndbno INT PRIMARY KEY,
 *   name TEXT NOT NULL,
 *   std_amount NUMERIC NOT NULL,
 *   std_measure TEXT NOT NULL,
 *   kcal_per NUMERIC,
 *   fat_per NUMERIC,
 *   sat_fat_per NUMERIC,
 *   fiber_per NUMERIC,
 *   cholesterol_per NUMERIC,
 *   sodium_per NUMERIC,
 *   carbs_per NUMERIC,
 *   sugar_per NUMERIC,
 *   protein_per NUMERIC
 * 
 *   //NOTE: cholesterol and sodium stored in mg
 *   // rest are in g (except kcal)
 * 
 * recipe_ingredients SCHEMA:
 *   id SERIAL PRIMARY KEY,
 *   recipe_id INT, 
 *   food_no INT, 
 *   quantity NUMERIC,
 *   quantity_measure VARCHAR,
 *   list_position INT,
 *   FOREIGN KEY food_no REFERENCES ingredients(ndbno),
 *   FOREIGN KEY recipe_id REFERENCES recipes(id)
 */