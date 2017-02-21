var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var cors = require('cors');
var multer = require('multer');
var fs = require('fs');
// var path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.originalname + '-' + datetimestamp);
  }
});

var upload = multer({storage: storage}).single('file');

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

// HEADERS
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://valor-software.github.io');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// MULTER SETTINGS
// app.use(multer({
//   dest: DIR,
//   rename: function (fieldname, filename) {
//     return filename + Date.now();
//   },
//   onFileUploadStart: function (file) {
//     console.log(file.originalname + ' is starting ...');
//   },
//   onFileUploadComplete: function (file) {
//     console.log(file.fieldname + ' uploaded to  ' + file.path + ' is complete!');
//   }
// }));

// ENDPOINTS

//===========Upload Endpoints=========================================
app.get('/upload', function (req, res) {
  res.end('File catcher example');
});
app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    console.log('This is the file being uploaded on server. req.file:  ' + req.filename);
    if (err) {
      return res.end(err.toString());
    }
    res.end('File is uploaded');
  });
});
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
