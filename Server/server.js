var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');

//CONfig//


//CONTROLLERS//


//SERVICES//


//POLICIES//


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


//CONNECTIONS//
var mongoURI = config.MONGO_URI;
var port = config.PORT;

mongoose.connect(mongoURI);

mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at ', mongoURI);
  app.listen(config.PORT, function () {
    console.log('Listening on port ', config.PORT);
  });
});
