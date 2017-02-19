var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var cors = require('cors');
// var path = require('path');

// CONFIG
var config = require('./config');

// CONTROLLERS
var serviceCtrl = require('./controllers/serviceCtrl.js');

// SERVICES
// var passport = require('./services/passport');

// POLICIES
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

// EXPRESS
var app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(__dirname + './../public'));
// app.use(session({
//   secret: config.SESSION_SECRET,
//   saveUninitialized: false,
//   resave: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
mongoose.set('debug', true);

// ENDPOINTS
//===========User Endpoints============================================


//===========Gallery Endpoints=========================================


//===========Service Endpoints========================================
app.post('/service', serviceCtrl.create);
app.get('/services', serviceCtrl.read);
app.get('/service/:id', serviceCtrl.readById);
app.put('/service/:id', serviceCtrl.update);
app.delete('/service/:id', serviceCtrl.delete);

// CONNECTIONS
// var port: number = process.env.PORT || 8000;
var mongoURI = config.MONGO_URI;
var port = config.PORT;

mongoose.connect(mongoURI);

mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at ', mongoURI);
  app.listen(config.PORT, function() {
    console.log('Listening on port ', config.PORT);
  });
});
