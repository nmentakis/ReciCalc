const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//const bcrypt = require("bcrypt");
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt;

const db = require("../database/db");
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    {usernameField: 'username',
     passwordField: 'password'},

  (username, password, done) => {
    db.findUser(username, function(err, user){
      if (!user || err) {
        console.log('did not find user', username);
        return done(null, false, { message: "Failure" });
      }
      //Check password match here
      bcrypt.compare(password, user[0].password, (err, res) => {
        if (res) {
          console.log('found user')
          user = user[0];
          user.id = user.id;
          delete user.password;
          return done(null, user);

        } else {
          console.log('Compare problem...')
          return done(err, null);
        }
      });
    });
  })
);

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter('Token'),
  secretOrKey   : 'Memes are cool'
},
function (jwtPayload, cb) {
  db.findUserJWT(jwtPayload.username, jwtPayload.password, function(err, user){
    if (!user || err) {
      console.log('Ran into issue: ',err, user);
      return cb(err, false, { message: "Failure" });
    }
    //Check password match here
    return cb(null, user[0], { message: "Success", username: user[0] });
  })
}))