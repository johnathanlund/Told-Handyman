// var User = require('../models/UserModel.js');
// var jwt = require('jsonwebtoken');
// var config = require('../config');
// var express = require('express');
// var app = express();
// var router = express.Router();
// var auth = require('../services/auth');

// app.use('/register', User.register);
// app.use('/login', User.login);

// router.post('/register', User.register);
// router.post('/login', User.login);

var User = require('../models/UserModel.js');
var jwt = require('jsonwebtoken');
var config = require('../config');
var bcrypt = require('bcryptjs');
var express = require('express');
var app = express();
var router = express.Router();
var auth = require('../services/auth');
var db = require('../dbconnection');

router.get('/check-state', auth.verifyToken, (req, res) => {
  let content = {
    success: true,
    message: 'Successfully logged in.'
  }
  res.send(content);
});

var generateHash = function( password ) {
  console.log('In UserCtrl, generateHash');
    return bcrypt.hashSync( password, bcrypt.genSaltSync(8), null);
};

var validPassword = function( password, res, err ) {
  console.log('Password has been verified, in UserCtrl.');
    return bcrypt.compareSync( password, this.password );
  };

router.post('/register', (req, res) => {

  // var reqUser = req.body;

  var today = new Date();
  var users = {
       "name":req.body.name,
       "email":req.body.email,
       "password":req.body.password,
       "created":today,
       "modified":today
     };
     console.log('Password is: '+JSON.stringify(users.password));
    //  users.password = User.generateHash(users.password);
    users.password = generateHash(users.password);
     console.log('Now password is: '+JSON.stringify(users.password));
     console.log('Inside UserCtrl for register: ' + JSON.stringify(users));

      db.query('insert into users set ?',users, function (error, results, fields) {
        if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log('The solution is: ', results);
      console.log('right before res.send in Register.');
      // res.send({
      //   "code":200,
      //   "success":"user registered sucessfully"
      //     });
      let token = jwt.sign(users, config.jwt_secret, {
        expiresIn : 60*60*24
      });
      let content = {
        user: users,
        success: true,
        message: 'You created a new user',
        token: token
      };
      console.log('In register func for nextTick, content shows: '+JSON.stringify(content));
      res.send(content);
    }
      });

  // process.nextTick( () => {
  //
  //   let token = jwt.sign(users, config.jwt_secret, {
  //     expiresIn : 60*60*24
  //   });
  //   let content = {
  //     user: users,
  //     success: true,
  //     message: 'You created a new user',
  //     token: token
  //   };
  //   console.log('In register func for nextTick, content shows: '+JSON.stringify(content));
  //   res.send(content);
  //   return;
  //
  //   // User.findOne({ 'email': reqUser.email }, (err, user) => {
  //   //   if(err){
  //   //     return done(err);
  //   //   }
  //   //   if(user){
  //   //     let content = {
  //   //       success: false,
  //   //       message: 'user already exists'
  //   //     };
  //   //     res.send(content);
  //   //     return;
  //   //   } else {
  //   //     var newUser = new User();
  //   //     newUser.name = reqUser.name;
  //   //     newUser.email = reqUser.email;
  //   //     newUser.password = newUser.generateHash(reqUser.password);
  //   //     newUser.save( (err) => {
  //   //         if( err )
  //   //             throw err;
  //   //
  //   //         let token = jwt.sign(newUser, config.jwt_secret, {
  //   //           expiresIn : 60*60*24
  //   //         });
  //   //         let content = {
  //   //           user: newUser,
  //   //           success: true,
  //   //           message: 'You created a new user',
  //   //           token: token
  //   //         };
  //   //         res.send(content);
  //   //         return;
  //   //     })
  //   //   }
  //   // })
  //
  //
  // })
});

router.post('/login', (req, res) => {

  var reqUser = req.body;

  User.findOne({'email' : reqUser.email}, (err, user) => {

    if( err )
      return done(err);

    if( !user ) {
      let content = {
        success: false,
        message: 'User does not exists'
      };
      res.send(content);
      return;
    }

    if( !user.validPassword(reqUser.password) ){
      let content = {
        success: false,
        message: 'Incorrect password'
      };
      res.send(content);
      return;
    }

    let token = jwt.sign(user, config.jwt_secret, {
      expiresIn : 60*60*24
    });
    let content = {
      user: user,
      success: true,
      message: 'You logged in',
      token: token
    };
    res.send(content);

  })

});

module.exports = router;
