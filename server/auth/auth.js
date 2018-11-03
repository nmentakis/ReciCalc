const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");

const env = require("../../db_config.js").environment;
const options = require("../../knexfile")[env];
const knex = require("knex")(options);

const path = require("path");
var hbs = require("nodemailer-express-handlebars"),
  email = process.env.MAILER_EMAIL_ID || "auth_email_address@gmail.com",
  pass = process.env.MAILER_PASSWORD || "auth_email_pass";
nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || "Gmail",
  auth: {
    user: email,
    pass: pass
  }
});

var handlebarsOptions = {
  viewEngine: "handlebars",
  viewPath: path.resolve("./api/templates/"),
  extName: ".html"
};

smtpTransport.use("compile", hbs(handlebarsOptions));

router.post("/login", function(req, res) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("User: ", user);
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      console.log("logging user in...");
      if (err) {
        return res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, "Memes are cool");
      return res.json({ user, token });
    });
  })(req, res);
});

router.post("/signup", function(req, res) {
  const password = req.body.password;
  const username = req.body.username;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("encrypting password: ", password);
    knex("users")
      .insert([{ username, password: hash }])
      .then(response => res.send(JSON.stringify(response)))
      .catch(error => res.send(JSON.stringify(error)));
  });
});

router.post("/forgotPassword", function(req, res) {});

router.get("/forgotPassword", function(req, res) {});
module.exports = router;
