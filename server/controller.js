require("dotenv").config();
const API_KEY = process.env.API_KEY;
const db = require("../database/db.js");
const axios = require("axios");
const qs = require("qs");
const format = require("../helpers/formatCheckers.js");
const bcrypt = require("bcrypt");

module.exports.recipes = {
  deleteOne: (req, res) => {
    console.log("delete request recieved!", req.body);
    db.deleteOneById(req.body.recipeId)
      .then(data => {
        console.log("back from database", data);
      })
      .catch(err => {
        console.error(err);
      });
    res.status(200).end("Deleted!");
  },
  getList: (req, res) => {
    //query database for a list of short recipe descriptions and return them
    db.fetchRecipeList()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log("ERROR FETCHING RECIPE LIST FROM DB: ", err);
        res.status(500).send();
      });
  },
  getOne: (req, res) => {
    //endpoint: /api/recipes/:recipeId
    //query database for detailed information on the given recipe and return it
    let recipeId = parseInt(req.params.recipeId);
    if (isNaN(recipeId)) {
      res.status(400).send("Malformed recipe ID");
    } else {
      db.fetchRecipeById(recipeId)
        .then(recipe => {
          if (recipe.status === "No Such Recipe") {
            res.status(404).send(recipe);
          } else {
            res.status(200).json(recipe);
          }
        })
        .catch(err => {
          console.log("ERROR FETCHING FULL RECIPE FROM DB:", err);
          res.status(500).send(err);
        });
    }
  },
  post: (req, res) => {
    //Store recipe in database
    //console.log('Incoming recipe request. Recipe:');
    let recipe = req.body.recipe;
    //console.log(recipe);
    if (format.isValidRecipe(recipe) === false) {
      res.status(400).send("Malformed recipe");
    } else {
      db.addRecipe(recipe)
        .then(data => {
          res.status(201).json({ newRecipeId: data });
        })
        .catch(err => {
          if (
            err.detail ===
            "A field with precision 8, scale 2 must round to an absolute value less than 10^6."
          ) {
            res
              .status(400)
              .send("Ingredient quantity too large: maximum value 999,999.99");
          } else {
            console.log("ERROR STORING RECIPE TO DATABASE:", err);
            res.status(500).send();
          }
        });
    }
  }
};

module.exports.ingredients = {
  getDbByName: (req, res) => {
    //expect req.query to have 'searchTerm'
    //Query database for ingredients matching a particular search string, and present them
    if (req.query.searchTerm === undefined) {
      res.status(400).send("Malformed search request");
    } else {
      db.searchIngredientsByName(req.query.searchTerm)
        .then(ingredients => {
          res.status(200).json(ingredients);
        })
        .catch(err => {
          console.log("ERROR SEARCHING FOR INGREDIENT: ", err);
          res.status(500).send();
        });
    }
  },
  getUsdaByName: (req, res) => {
    //Query USDA NDB API for ingredients matching a particular search string, and present them

    //expect req.params to have 'searchTerm'
    //also expect it may have 'page'
    //console.log('looking for USDA ingredients by name: ' + req.query.searchTerm)
    let offset = req.query.page ? req.query.page * 8 : 0;

    axios
      .get(`https://api.nal.usda.gov/ndb/search/?`, {
        params: {
          format: "JSON",
          q: req.query.searchTerm,
          sort: "r",
          max: 8,
          offset: offset,
          ds: "Standard Reference",
          api_key: `${API_KEY}`
        }
      })
      .then(data => {
        if (data.data.list) {
          res.status(200).send(data.data.list.item);
        } else {
          res.status(200).send([]);
        }
      })
      .catch(error => {
        console.log("Error searching USDA database: ", error);
        res.status(500).send();
      });
  },
  getUsdaIngredientInfo: (req, res) => {
    //expect req.params.ndbno
    //Query USDA API for nutritional data about the provided item number
    if (format.isValidNdbno(req.params.ndbno) === false) {
      res.status(400).send("Malformed NDB number");
    }
    //console.log('looking for nutrients by NDB no: ', req.params.ndbno);
    axios
      .get("https://api.nal.usda.gov/ndb/nutrients/?", {
        params: {
          format: "JSON",
          api_key: `A1ENnX84cOUEPD2o8uk8KevT2gCqy111m0X4ukMK`,
          nutrients: [
            "208",
            "204",
            "606",
            "291",
            "203",
            "307",
            "601",
            "269",
            "205"
          ],
          ndbno: req.params.ndbno
        },
        paramsSerializer: function(params) {
          return qs.stringify(params, { indices: false });
        }
      })
      .then(data => {
        console.log(data);
        if (data.data.errors) {
          res.status(500).send(data.data.errors.error);
        } else {
          res
            .status(200)
            .send(data.data.report.foods[0])
            .catch(err => {
              console.log("ERROR: ", err);
              res
                .status(500)
                .send("Data fetched, but not stored to database. Try again.");
            });
        }
      })
      .catch(error => {
        console.log("ERROR IN INGREDIENT FIND: ", error);
        res.status(500).send();
      });
  },
  post: (req, res) => {
    //Store ingredient in database
    //planned functionality moved elsewhere...
    res.status(404).send();
  }
};

module.exports.auth = {
  changeUsername: (req, response) => {
    newUsername = req.body.newUsername;
    username = req.body.username;
    password = req.body.password;

    db.findUser(username, (err, user) => {
      if (err || !user) {
        console.log("something went wrong while changing username");
        response.end("Username not in db");
      }
      bcrypt.compare(password, user[0].password, (err, res) => {
        if (!res || err) {
          // res.status(400).send('Wrong Password');
          console.log("Wrong Password");
          response.status(400).end("Wrong Password");
        }
        if (res) {
          console.log("found user!", res);
          //change username here.
          db.changeUsername(user[0].username, newUsername, (err, res) => {
            if (err) {
              console.log("Username Already exists");
              response.status(400).end("Username already exists");
            }

            response.status(201).end("changed username");
          });
        }
      });
    });
    // response.end();
  },

  changePassword: (req, response) => {
    const newPassword = req.body.newPassword;
    const password = req.body.password;
    const username = req.body.username;

    db.findUser(username, (err, user) => {
      if (err || !user) {
        console.log("something went up while changing password");
        response.status(404).end("Didnt find user");
        return;
      }

      bcrypt.compare(password, user[0].password, (err, res) => {
        if (!res || err) {
          response.status(400).end("Wrong Password");
        }
        if (res) {
          db.changePassword(username, newPassword, res => {
            response.status(201).end("Successfully Changed Password");
          });
        }
      });
    });
  },
  deleteAccount: (req, response) => {
    username = req.body.username
    password = req.body.password

    db.findUser(username, (err, user) => {
      if (err || !user) {
        console.log("something went wrong deleteing user", req.body);
        response.status(404).end("Didnt find user");
        return;
      }

      bcrypt.compare(password, user[0].password, (err, res) => {
        if (!res || err) {
          response.status(400).end("Wrong Password");
        }
        if (res) {
          db.deleteAccount(username, (err, res) => {
            if(err){
              response.status(404).end('Something went wrong when deleting account');
              return;
            }
            response.status(201).end("Successfully deleted account");
          });
        }
      });
    });

  }
};
//EXAMPLE DATABASE INTERACTION:
//
//confirmAccess = function(req, res) => {
//  db.checkAccess(req.params.number)
//    .then(data => {
//      //do some calculations with the data and make formattedData
//      res.status(200).json(formattedData);
//    })
//    .catch(err => res.status(500).send(err));
//}
