const express = require('express');
const router  = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');

const env = require('../../db_config.js').environment;
const options = require('../../knexfile')[env];
const knex = require('knex')(options);



router.post('/login', function (req, res) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log('User: ',user)
      if (err || !user) {
          return res.status(400).json({
              message: 'Something is not right',
              user: user
          });
      }
     req.login(user, {session: false}, (err) => {
      console.log('logging user in...')
      if (err) {
        return res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'Memes are cool');
      return res.json({user, token});
      });
  })(req, res);
});

router.post('/signup', function(req, res){

  const password = req.body.password;
  const username = req.body.username;
  bcrypt.hash(password, 10, (err, hash) => {

    if (err) {
      console.log(err);
      return;
    }
    console.log('encrypting password: ', password);
    knex('users')
      .insert([{ username, password: hash }])
      .then(response => res.send(JSON.stringify(response)))
      .catch(error => res.send(JSON.stringify(error)));
  });
});

module.exports = router