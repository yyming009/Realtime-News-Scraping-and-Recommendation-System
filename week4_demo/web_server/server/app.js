var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');

var passport = require('passport');
var path = require('path');

var auth = require('./routes/auth');
var index = require('./routes/index');
var news = require('./routes/news');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../client/build/'));
app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));

//
// //write for test for diffent server
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// })
app.use(cors());

var config = require('./config/config.json');
require('./models/main.js').connect(config.mongoDbUri);

app.use(passport.initialize());
var localSignupStrategy = require('./password/signup_passport');
var localLoginStrategy = require('./password/login_passport');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('./middleware/auth_check');
app.use('./news', authCheckMiddleware);

app.use('/auth', auth);
app.use('/', index);
app.use('/news', news);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404 Not Found');
});


module.exports = app;
