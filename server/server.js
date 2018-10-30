const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const router = require('./routes.js');


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));


// CONTROLLERS

app.use('/api', router);


// FALLBACK ROUTE
// React Router is a Client Side Router (CSR)
// All the router logic lives at the top level/root of the app
// If page is refreshed outside of root url, send request to the root html, where the CSR logic lives
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

let port = process.env.PORT;
if(port === null || port === '') {
  port = 3000;
}
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

