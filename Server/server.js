var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');

//CONfig//
var config = require('./config');

//CONTROLLERS//


//SERVICES//
var passport = require('./services/passport');

//POLICIES//
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

//EXPRESS//
var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + './../public'));
app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.set('debug', true);

//ENDPOINTS//
//============User Endpoints====================
app.post('/user', userCtrl.register);
app.get('/me', isAuthed, userCtrl.me);
app.put('/user/:_id', isAuthed, userCtrl.update);
app.get('/users', userCtrl.read);
app.delete('/user/:id', userCtrl.delete);

app.post('/login', passport.authenticate('local', {
  successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});


//CONNECTIONS//
var mongoURI = config.MONGO_URI;
var port = config.PORT; //3000//

mongoose.connect(mongoURI);

mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at ', mongoURI);
  app.listen(config.PORT, function () {
    console.log('Listening on port ', config.PORT);
  });
});
