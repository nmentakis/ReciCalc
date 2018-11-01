module.exports.location = {
  host : 'localhost',
  user : 'postgres',
  database : 'Recipes'
};
 
module.exports.production = {
  client: 'pg',
  connection: process.env.DATABASE_URL + '?ssl=true',
}

module.exports.environment = 'development';

  //Used in database/db.js to determine with part of knexfile.js to use