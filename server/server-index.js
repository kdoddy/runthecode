const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');

const db = require('../database/database-index.js');
require('../config/passport.js')(passport);

var app = express();
var PORT = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'willsmith',
  saveUninitialized: true,
  resave: true
}));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.post("/code", function(req, res) {
  res.send("Heard post from app.")
  console.log("The current state of the code is ", req.body.code);
})

require('./routes.js')(app, passport);

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});