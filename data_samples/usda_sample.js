//const API_KEY = require('./config.example.js').API_KEY;
let API_KEY = () => '';
//EXAMPLE search process--------->
// search for 'deli ham' with this url:
//`https://api.nal.usda.gov/ndb/search/?format=json&q=deli%20ham&sort=r&max=50&offset=0&ds=Standard%20Reference&api_key=${API_KEY}`
//Grab the resulting list from list[...item] (item is an array of objects)
//Each item has a ndbno number that is unique to that food item
//This list can be trimmed and given as options for when a user wants to validate an ingredient

//`params: {
//  format: JSON,
//  q: query,
//  sort: r,
//  max: 50,
//  offset: 0
//  ds: 'Standard Reference'
//  api_key: ${API_KEY}
//}`

const testDataSearch = {
  "list": {
    "q": "deli ham",
    "sr": "1",
    "ds": "Standard Reference",
    "start": 0,
    "end": 2,
    "total": 2,
    "group": "",
    "sort": "r",
    "item": [
      {
        "offset": 0,
        "group": "Sausages and Luncheon Meats",
        "name": "Ham, sliced, pre-packaged, deli meat (96%fat free, water added)",
        "ndbno": "07028",
        "ds": "SR",
        "manu": "none"
      },
      {
        "offset": 1,
        "group": "Sausages and Luncheon Meats",
        "name": "Ham, turkey, sliced, extra lean, prepackaged or deli",
        "ndbno": "42128",
        "ds": "SR",
        "manu": "none"
      }
    ]
  }
}

//Use the nutrient search api with this url:
//`https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${API_KEY}&nutrients=208&nutrients=204&nutrients=205&nutrients=606&nutrients=291&nutrients=203&nutrients=307&nutrients=601&nutrients=269&ndbno=07028`

//`params: {
//  format: JSON,
//  api_key: ${API_KEY}
//  nutrients: [208, 204, 606, 291, 203, 307, 601, 269, 205],
//  ndbno: ndbno
//}`
//The nutrients list will be an array of pre-chosen nutrient id numbers via the options in a get request, the ndbno number comes from the previous search
//Resulting object should look similar to this:

const testDataNutrients = {
  "report": {
    "sr": "1",
    "groups": "All groups",
    "subset": "All foods",
    "end": 1,
    "start": 0,
    "total": 1,
    "foods": [
      {
        "ndbno": "07028",
        "name": "Ham, sliced, pre-packaged, deli meat (96%fat free, water added)",
        "weight": 13.0,
        "measure": "1.0 slice",
        "nutrients": [
          {
            "nutrient_id": "203",
            "nutrient": "Protein",
            "unit": "g",
            "value": "2.19",
            "gm": 16.85
          },
          {
            "nutrient_id": "269",
            "nutrient": "Sugars, total",
            "unit": "g",
            "value": "--",
            "gm": "--"
          },
          {
            "nutrient_id": "204",
            "nutrient": "Total lipid (fat)",
            "unit": "g",
            "value": "0.53",
            "gm": 4.04
          },
          {
            "nutrient_id": "205",
            "nutrient": "Carbohydrate, by difference",
            "unit": "g",
            "value": "0.09",
            "gm": 0.7
          },
          {
            "nutrient_id": "601",
            "nutrient": "Cholesterol",
            "unit": "mg",
            "value": "5",
            "gm": 41.0
          },
          {
            "nutrient_id": "208",
            "nutrient": "Energy",
            "unit": "kcal",
            "value": "14",
            "gm": 107.0
          },
          {
            "nutrient_id": "291",
            "nutrient": "Fiber, total dietary",
            "unit": "g",
            "value": "0.0",
            "gm": 0.0
          },
          {
            "nutrient_id": "307",
            "nutrient": "Sodium, Na",
            "unit": "mg",
            "value": "123",
            "gm": 945.0
          },
          {
            "nutrient_id": "606",
            "nutrient": "Fatty acids, total saturated",
            "unit": "g",
            "value": "0.160",
            "gm": 1.227
          }
        ]
      }
    ]
  }
}

const nutrientIdArray = [208, 204, 606, 291, 203, 307, 601, 269, 205];

const nutrientIdList = {
  'energy': 208,
  'fats_total': 204,
  'saturated_fats': 606,
  'fiber': 291,
  'protein': 203,
  'sodium': 307,
  'cholesterol': 601,
  'sugars': 269,
  'carbs': 205
}

const foodGroups = {
  "American Indian/Alaska Native Foods": 3500,
  "Baby Foods": 0300,
  "Baked Products": 1800,
  "Beef Products": 1300,
  "Beverages": 1400,
  "Breakfast Cereals": 0800,
  "Cereal Grains and Pasta": 2000,
  "Dairy and Egg Products": 0100,
  "Fast Foods": 2100,
  "Fats and Oils": 0400,
  "Finfish and Shellfish Products": 1500,
  "Fruits and Fruit Juices": 0900,
  "Lamb, Veal, and Game Products": 1700,
  "Legumes and Legume Products": 1600,
  "Meals, Entrees, and Side Dishes": 2200,
  "Nut and Seed Products": 1200,
  "Pork Products": 1000,
  "Poultry Products": 0500,
  "Restaurant Foods": 3600,
  "Sausages and Luncheon Meats": 0700,
  "Snacks": 2500,
  "Soups, Sauces, and Gravies": 0600,
  "Spices and Herbs": 0200,
  "Sweets": 1900,
  "Vegetables and Vegetable Products": 1100
}

module.exports.testDataSearch = testDataSearch;
module.exports.testDataNutrients = testDataNutrients;