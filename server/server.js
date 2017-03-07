var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var cors = require('cors');
var multer = require('multer');
var fs = require('fs');

// CONFIG
var config = require('./config');

// CONTROLLERS
var serviceCtrl = require('./controllers/serviceCtrl.js');
var serviceListCtrl = require('./controllers/serviceListCtrl.js')

// SERVICES
// var passport = require('./services/passport');

// Multer settings for handling file uploads.
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.originalname);
    // cb(null, file.originalname + '-' + datetimestamp);
  }
});

var upload = multer({storage: storage}).single('photo');

// POLICIES
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

// EXPRESS
var app = express();

app.use(bodyParser.json());
// app.use(cors());
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
var permitCrossDomainRequests = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// some browsers send a pre-flight OPTIONS request to check if CORS is enabled so you have to also respond to that
if ('OPTIONS' === req.method) {
  res.sendStatus(200);
}
else {
  next();
}
};
app.use(permitCrossDomainRequests);

// ENDPOINTS

//===========Upload Endpoints=========================================
app.get('/uploads', function(req, res, next) {
// render the index page, and pass data to it.
  res.render('index', { title: 'Express' });
});

//our file upload function.
app.post('/upload', function (req, res, next) {
    console.log("In the Server Post function.");
     upload(req, res, function (err) {
       console.log('Inside the upload function within Post.');
          // req.file.filename = req.file.originalname + '-' + Date.now();
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }
        console.log('This is the UPLOAD file json of req.file:   ' + JSON.stringify(req.file));
       // No error occured.
        return res.send("Upload TOTALLY Completed for "+ req.file.filename);
  });
})
//===========User Endpoints============================================


//===========Gallery Endpoints=========================================


//===========Service Endpoints========================================
app.post('/service', serviceCtrl.create);
app.get('/services', serviceCtrl.read);
app.get('/service/:id', serviceCtrl.readById);
app.put('/service/:id', serviceCtrl.update);
app.delete('/service/:id', serviceCtrl.delete);
//===========Service List Endpoints===================================
app.post('/serviceList', serviceListCtrl.create);
app.get('/serviceLists', serviceListCtrl.read);
app.get('/serviceList/:id', serviceListCtrl.readById);
app.put('/serviceList/:id', serviceListCtrl.update);
app.delete('/serviceList/:id', serviceListCtrl.delete);

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
