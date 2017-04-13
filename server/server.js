var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var cors = require('cors');
var multer = require('multer');
var fs = require('fs');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var User = require('./models/UserModel.js');

// CONFIG
var config = require('./config');

// CONTROLLERS
var galleryCtrl = require('./controllers/galleryCtrl.js');
var serviceCtrl = require('./controllers/serviceCtrl.js');
var serviceListCtrl = require('./controllers/serviceListCtrl.js');
var reviewCtrl = require('./controllers/reviewCtrl.js');
var userCtrl = require('./controllers/userCtrl.js');

// SERVICES
// var passport = require('./services/passport.js');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.nodemailer_user,
    pass: config.nodemailer_pass
  }
});

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
// var isAuthed = function(req, res, next) {
//   if (!req.isAuthenticated()) return res.status(401).send();
//   return next();
// };

// EXPRESS
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());
// app.use(express.static(__dirname + './../public'));
app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));

// app.use(expressJwt({ secret: config.jwt_secret }).unless({}))

// app.use(passport.initialize());
// app.use(passport.session());

mongoose.set('debug', true);

// HEADERS
var permitCrossDomainRequests = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, x-access-token, Accept");
  // res.header('Access-Control-Allow-Credentials', true);
// some browsers send a pre-flight OPTIONS request to check if CORS is enabled so you have to also respond to that
if ('OPTIONS' === req.method) {
  res.sendStatus(200);
}
else {
  next();
}
};
app.use(permitCrossDomainRequests);

// var protected = app.get('/', function(req, res){
//     res.json(req.decoded);
// });

// ENDPOINTS
// app.get('/', function(req, res){
//     res.json(req.decoded);
// });
//-----------------User Login Methods------------------
app.use('/api/user', userCtrl);
// app.post('/register', function(req, res, next) {
//  console.log('running endpoint');
//  next();
// },userCtrl.addUser);
// app.get('/user', userCtrl.getUser);
// app.get('/getCurrentUser', function(req, res, next) {
// console.log('Server inside the /getCurrentUser function.');
// next();
// }, userCtrl.getCurrentUser);
// app.post('/authenticate', userCtrl.authenticate);
// app.post('/login', passport.authenticate( 'local', {
//  successRedirect: '/getCurrentUser' }));
// app.post('/login', passport.authenticate('local'), function (req, res, next) {
//   console.log('Server inside the /login function.');
//    res.status(200);
//  });
// app.post('/login', userCtrl.userAuthenticate);
// app.get('/logout', function(req, res, next) { //logout//
//  req.logout();
//  console.log("User has been logged out.");
//  return res.status(200).send("logged out");
// });

//===========Contact Form Endpoints==============================================
app.post('/contactForm', function (req, res, next) {
  console.log("In Server, Contact Form shows req.body as: " + req.body);
  console.log("In Server, Contact Form shows req.body.contactName as: " + req.body.contactName);
  var mailOptions = {
    from: req.body.contactName + '<' + config.nodemailer_user +'>',
    to: config.nodemailer_recipient,
    subject: req.body.contactName +' - Told Handyman Contact Form from Website',
    text: 'Hello world ?',
    html:   '<div style:"display:inline-block; width:70vw; float:left;">' +
        '<div class="email_header" style="width: 100vw;height: 8vh;background: radial-gradient(rgb(180,21,17), white);color: #fff;text-align:center; ">' +
          '<h3 style="padding:2vh 0 0 0;">NEW CONTACT FORM SENT FROM TOLD HANDYMAN WEBSITE</h3></div>' +
        '<h1  style="color: blue; padding: 0 0 0 10px;margin:0;">Contact Information:</h1><br>' +
        '<div style="margin: 0 0 1vh 0;border-bottom:3px solid blue; display:flex;box-shadow: 0 6px 10px black;"><h3 style="width:150px;color:rgb(180,21,17);font-style: italic;margin:0;padding:30px 0 0 10px;">Name:  </h3><p style="margin:30px 0 0 0;padding:0;">' + req.body.contactName + '</p></div><br>' +
        '<div style="margin: 0 0 1vh 0;border-bottom:3px solid blue; display:flex;box-shadow: 0 6px 10px black;"><h3 style="width:150px;color:rgb(180,21,17);font-style: italic;margin:0;padding:30px 0 0 10px;">Email:  </h3><p style="margin:30px 0 0 0;padding:0;">' + req.body.contactEmail + '</p></div><br>' +
        '<div style="margin: 0 0 1vh 0;border-bottom:3px solid blue; display:flex;box-shadow: 0 6px 10px black;"><h3 style="width:150px;color:rgb(180,21,17);font-style: italic;margin:0;padding:30px 0 0 10px;">Phone #:  </h3><p style="margin:30px 0 0 0;padding:0;"> (' + req.body.contactPhone1of3 + ')' + req.body.contactPhone2of3 + '-' + req.body.contactPhone3of3 + '</p></div><br>' +
        '<div style="margin: 0 0 2vh 0;border-bottom:3px solid blue; display:flex;box-shadow: 0 6px 10px black;"><h3 style="width:150px;color:rgb(180,21,17);font-style: italic;margin:0;padding:30px 0 0 10px;">Message:  </h3><br><p style="margin:30px 0 0 30px;padding:0;">' + req.body.contactMessage + '</p></div><br>'
        + '</div>'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('An error occured sending contact form email.');
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
