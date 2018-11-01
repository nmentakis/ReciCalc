const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const knex = require('knex')

passport.serializeUser((user, done) =>{
  done(null, user.username)
})

passport.deserializeUser((id, done) => {
  knex
    .select('*')
    .from('users')
    .where('username', id)
    .then(user => done(null, user[0]))
    .catch(err => done(err, null));
})

passport.use(new LocalStrategy((username, password, done) =>{
  //go to db and check username
  knex
  .select('*')
  .from('users')
  .where({username})
  .then((user) =>{
    if(!user){
      console.log('didnt find user')
      done(null, false, {message: 'Didnt find user in db'})
    }
    console.log(user)
  })
}))