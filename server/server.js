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
var mysql = require('mysql');
var http = require('http');

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

app.use(bodyParser.urlencoded({ extended: true }));
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
// app.post('/gallery', galleryCtrl.create);
app.post('/gallery', function(req, res, next) {
  console.log("Gallery Create shows req.body: " + JSON.stringify(req.body) + ' and that id is: ' + JSON.stringify(req.params.id));
  galleryCtrl.create(req.body, function(err, rows) {
    if (err) {
      console.log("Error in server.js for galleryCtrl Create.");
      res.json(err);
    } else {
      console.log("Success in server.js for galleryCtrl Create.");
      res.json(rows);
    }
  });
});
// app.get('/gallerys', galleryCtrl.read);
app.get('/gallerys', function(req, res, next) {
  galleryCtrl.read(function(err, rows) {
    if (err) {
      console.log("error occured server.js for galleryCtrl read.");
      res.json(err);
    } else {
      console.log("Success at server.js for galleryCtrl read.");
      res.json(rows);
    }
  });
});
// app.get('/gallery/:id', galleryCtrl.readById);
app.get('/gallery/:id', function(req,res,next) {
  if (req.params.id) {
    galleryCtrl.readById(req.params.id, function(err, rows) {
      if (err) {
        console.log("error occured server.js for galleryCtrl readById.");
        res.json(err);
      } else {
        console.log("Success at server.js for galleryCtrl readById.");
        res.json(rows);
      }
    });
  }
});
// app.put('/gallery/:id', galleryCtrl.update);
app.put('/gallery/:id', function(req, res, next) {
  console.log("Gallery Update shows req.body: " + JSON.stringify(req.body));
  galleryCtrl.update(req.params.id,req.body, function(err, rows) {
    if (err) {
      console.log("Error in server.js for galleryCtrl Update.");
      res.json(err);
    } else {
      console.log("Success in server.js for galleryCtrl Update.");
      res.json(rows);
    }
  });
});
// app.delete('/gallery/:id', galleryCtrl.delete);
app.delete('/gallery/:id', function(req,res,next) {
  if (req.params.id) {
    galleryCtrl.delete(req.params.id, function(err, rows) {
      if (err) {
        console.log("Error occured server.js for galleryCtrl Delete.");
        res.json(err);
      } else {
        console.log("Success at server.js for galleryCtrl Delete.");
        res.json(rows);
      }
    });
  }
});
//===========Service Endpoints========================================
// app.post('/service', serviceCtrl.create);
app.post('/service', function(req, res, next) {
  console.log("Service Create shows req.body: " + JSON.stringify(req.body) + ' and that id is: ' + JSON.stringify(req.params.id));
  serviceCtrl.create(req.body, function(err, rows) {
    if (err) {
      console.log("Error in server.js for serviceCtrl Create.");
      res.json(err);
    } else {
      console.log("Success in server.js for serviceCtrl Create.");
      res.json(rows);
    }
  });
});
// app.get('/services', serviceCtrl.read);
app.get('/services', function(req, res, next) {
  serviceCtrl.read(function(err, rows) {
    if (err) {
      console.log("error occured server.js for serviceCtrl read.");
      res.json(err);
    } else {
      console.log("Success at server.js for serviceCtrl read.");
      res.json(rows);
    }
  });
});
// app.get('/service/:id', serviceCtrl.readById);
app.get('/service/:id', function(req,res,next) {
  if (req.params.id) {
    serviceCtrl.readById(req.params.id, function(err, rows) {
      if (err) {
        console.log("error occured server.js for serviceCtrl readById.");
        res.json(err);
      } else {
        console.log("Success at server.js for serviceCtrl readById.");
        res.json(rows);
      }
    });
  }
});
// app.put('/service/:id', serviceCtrl.update);
app.put('/service/:id', function(req, res, next) {
  console.log("Service Update shows req.body: " + JSON.stringify(req.body));
  serviceCtrl.update(req.params.id,req.body, function(err, rows) {
    if (err) {
      console.log("Error in server.js for serviceCtrl Update.");
      res.json(err);
    } else {
      console.log("Success in server.js for serviceCtrl Update.");
      res.json(rows);
    }
  });
});
// app.delete('/service/:id', serviceCtrl.delete);
app.delete('/service/:id', function(req,res,next) {
  if (req.params.id) {
    serviceCtrl.delete(req.params.id, function(err, rows) {
      if (err) {
        console.log("Error occured server.js for serviceCtrl Delete.");
        res.json(err);
      } else {
        console.log("Success at server.js for serviceCtrl Delete.");
        res.json(rows);
      }
    });
  }
});
//===========Service List Endpoints===================================
// app.post('/serviceList', serviceListCtrl.create);
app.post('/serviceList', function(req, res, next) {
  console.log("ServiceList Create shows req.body: " + JSON.stringify(req.body) + ' and that id is: ' + JSON.stringify(req.params.id));
  serviceListCtrl.create(req.body, function(err, rows) {
    if (err) {
      console.log("Error in server.js for serviceListCtrl Create.");
      res.json(err);
    } else {
      console.log("Success in server.js for serviceListCtrl Create.");
      res.json(rows);
    }
  });
});
// app.get('/serviceLists', serviceListCtrl.read);
app.get('/serviceLists', function(req, res, next) {
  serviceListCtrl.read(function(err, rows) {
    if (err) {
      console.log("error occured server.js for serviceListCtrl read.");
      res.json(err);
    } else {
      console.log("Success at server.js for serviceListCtrl read.");
      res.json(rows);
    }
  });
});
// app.get('/serviceList/:id', serviceListCtrl.readById);
app.get('/serviceList/:id', function(req,res,next) {
  if (req.params.id) {
    serviceListCtrl.readById(req.params.id, function(err, rows) {
      if (err) {
        console.log("error occured server.js for serviceListCtrl readById.");
        res.json(err);
      } else {
        console.log("Success at server.js for serviceListCtrl readById.");
        res.json(rows);
      }
    });
  }
});
app.put('/serviceList/:id', function(req, res, next) {
  console.log("ServiceList Update shows req.body: " + JSON.stringify(req.body));
  serviceListCtrl.update(req.params.id,req.body, function(err, rows) {
    if (err) {
      console.log("Error in server.js for serviceListCtrl Update.");
      res.json(err);
    } else {
      console.log("Success in server.js for serviceListCtrl Update.");
      res.json(rows);
    }
  });
});
app.delete('/serviceList/:id', function(req,res,next) {
  if (req.params.id) {
    serviceListCtrl.delete(req.params.id, function(err, rows) {
      if (err) {
        console.log("Error occured server.js for serviceListCtrl Delete.");
        res.json(err);
      } else {
        console.log("Success at server.js for serviceListCtrl Delete.");
        res.json(rows);
      }
    });
  }
});
//===========Review Endpoints=========================================
// app.post('/review', reviewCtrl.create);
app.post('/review', function(req, res, next) {
  console.log("Review Create shows req.body: " + JSON.stringify(req.body) + ' and that id is: ' + JSON.stringify(req.params.id));
  reviewCtrl.create(req.body, function(err, rows) {
    if (err) {
      console.log("Error in server.js for reviewCtrl Create.");
      res.json(err);
    } else {
      console.log("Success in server.js for reviewCtrl Create.");
      res.json(rows);
    }
  });
});
// app.get('/reviews', reviewCtrl.read);
app.get('/reviews', function(req, res, next) {
  reviewCtrl.read(function(err, rows) {
    if (err) {
      console.log("error occured server.js for reviewCtrl read.");
      res.json(err);
    } else {
      console.log("Success at server.js for reviewCtrl read.");
      res.json(rows);
    }
  });
});
// app.get('/review/:id', reviewCtrl.readById);
app.get('/review/:id', function(req,res,next) {
  if (req.params.id) {
    reviewCtrl.readById(req.params.id, function(err, rows) {
      if (err) {
        console.log("error occured server.js for reviewCtrl readById.");
        res.json(err);
      } else {
        console.log("Success at server.js for reviewCtrl readById.");
        res.json(rows);
      }
    });
  }
});
// app.put('/review/:id', reviewCtrl.update);
app.put('/review/:id', function(req, res, next) {
  console.log("Review Update shows req.body: " + JSON.stringify(req.body));
  reviewCtrl.update(req.params.id,req.body, function(err, rows) {
    if (err) {
      console.log("Error in server.js for reviewCtrl Update.");
      res.json(err);
    } else {
      console.log("Success in server.js for reviewCtrl Update.");
      res.json(rows);
    }
  });
});
// app.delete('/review/:id', reviewCtrl.delete);
app.delete('/review/:id', function(req,res,next) {
  if (req.params.id) {
    reviewCtrl.delete(req.params.id, function(err, rows) {
      if (err) {
        console.log("Error occured server.js for reviewCtrl Delete.");
        res.json(err);
      } else {
        console.log("Success at server.js for reviewCtrl Delete.");
        res.json(rows);
      }
    });
  }
});

// CONNECTIONS
// var port: number = process.env.PORT || 8000;
// var mongoURI = config.MONGO_URI;
// var port = config.PORT;
//
// mongoose.connect(mongoURI);
//
// mongoose.connection.once('open', function() {
//   console.log('Connected to MongoDB at ', mongoURI);
//   app.listen(config.PORT, function() {
//     console.log('Listening on port ', config.PORT);
//   });
// });

// Database Connection
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'jal',
//   password : '',
//   database : 'told_handyman'
// });
// try {
// 	connection.connect();
//
// } catch(e) {
// 	console.log('Database Connetion failed:' + e);
// }

// Setup express
// app.use(parse.json());
// app.use(parse.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 5000);

// Set default route
app.get('/', function (req, res) {
	res.send('<html><body><p>Welcome to the Told Handyman App</p></body></html>');
});

// Create server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});
