var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var cors = require('cors');
var multer = require('multer');
var fs = require('fs');
var nodemailer = require('nodemailer');

// CONFIG
var config = require('./config');

// CONTROLLERS
var galleryCtrl = require('./controllers/galleryCtrl.js');
var serviceCtrl = require('./controllers/serviceCtrl.js');
var serviceListCtrl = require('./controllers/serviceListCtrl.js');
var reviewCtrl = require('./controllers/reviewCtrl.js')

// SERVICES
// var passport = require('./services/passport');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.nodemailer_user,
    pass: config.nodemailer_pass
  }
});

// var mailOptions = {
//   from: '"The Legend" <johnathanlund@gmail.com>',
//   to: 'jalshield@gmail.com',
//   subject: 'Hello from the server',
//   text: 'Hello world ?',
//   html: '<h1>Hello Mystic World of Email</h1><br style:"color: blue;"><p>Wolves rock</p>'
// };
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log('Message %s sent: %s', info.messageId, info.response);
// });

// Multer settings for handling file uploads.
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('WITHIN storage destination function');
    cb(null, './server/uploads/');
  },
  filename: function (req, file, cb) {
    console.log('WITHIN storage filename function: ' + file.originalname );
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

//===========Contact Form Endpoints==============================================
app.post('/contactForm', function (req, res, next) {
  console.log("In Server, Contact Form shows req.body as: " + req.body);
  console.log("In Server, Contact Form shows req.body.contactName as: " + req.body.contactName);
  var mailOptions = {
    from: '"The Legend" <' + config.nodemailer_user +'>',
    to: config.nodemailer_recipient,
    subject: 'Told Handyman Contact Form from Website',
    text: 'Hello world ?',
    html: '<h1>Hello Mystic World of Email</h1><br style:"color: blue;"><p>Wolves rock</p>' +
    req.body.contactName + '<br><h2>Message: </h2>' + req.body.contactMessage
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
});

//===========Upload Endpoints=========================================
app.get('/uploads', function(req, res, next) {
// render the index page, and pass data to it.
  res.render('index', { title: 'Express' });
});

//our file upload function.
app.post('/upload', function (req, res, next) {
     upload(req, res, function (err) {
       console.log('Inside the upload function within Post. file name is: ' + JSON.stringify(req.file));
          // req.file.filename = req.file.originalname + '-' + Date.now();
        if (err) {
          // An error occurred when uploading
          console.log('Error is POST /upload, Upload function is: ' + err);
          return res.status(422).send("an Error occured")
        }
        console.log('This is the UPLOAD file json of req.file:   ' + JSON.stringify(req.file));
       // No error occured.
        return res.send("Upload TOTALLY Completed for "+ req.file.filename);
  });
})
//===========User Endpoints============================================


//===========Gallery Endpoints=========================================
app.post('/gallery', galleryCtrl.create);
app.get('/gallerys', galleryCtrl.read);
app.get('/gallery/:id', galleryCtrl.readById);
app.put('/gallery/:id', galleryCtrl.update);
app.delete('/gallery/:id', galleryCtrl.delete);
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
//===========Review Endpoints=========================================
app.post('/review', reviewCtrl.create);
app.get('/reviews', reviewCtrl.read);
app.get('/review/:id', reviewCtrl.readById);
app.put('/review/:id', reviewCtrl.update);
app.delete('/review/:id', reviewCtrl.delete);

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
