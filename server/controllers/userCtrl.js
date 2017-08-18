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
  // console.log('In UserCtrl, generateHash');
    return bcrypt.hashSync( password, bcrypt.genSaltSync(8), null);
};

// var validPassword = function( password, res, err ) {
//   if (err) {
//     console.log('Error occured for validPassword in userCtrl: '+ err);
//     res.status(500).send(err);
//   } else {
//     console.log('Password has been verified, in UserCtrl.');
//       return bcrypt.compareSync( password, this.password );
//   }
//   };

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
    users.password = generateHash(users.password);

      db.query('insert into users set ?',users, function (error, results, fields) {
        if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
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
      console.log('Successfully Registered new user "' + content.user.name + '" in userCtrl Register function.');
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
  var users = {
       "name":req.body.name,
       "email":req.body.email,
       "password":req.body.password
     };
  var validPassword = function( password, res, err ) {
    if (err) {
      console.log('Error occured for validPassword in userCtrl: '+ err);
      res.status(500).send(err);
    } else {
      console.log('In validPassword, password shows as: ',password);
      console.log('In validPassword, users.password shows as: ',users.password);
      console.log('Password has been verified, in UserCtrl.');
        return bcrypt.compareSync( users.password, password);
    }
    };

  // var reqUser = req.body;

  db.query('SELECT * FROM users WHERE email = ?',[users.email], function (error, results, fields) {
    console.log('THis is the rows from userCtrl Login func: ',results);
    // var resultsPass = [0].password;
    // console.log('1 resultsPass shows as: ' + rows[0]);
    // console.log('2 resultsPass shows as: ' + JSON.stringify(rows[0].password));
    if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      // console.log('In the IF for results. now shows pass as: ',results.RowDataPacket.password);
      if(validPassword(results[0].password)){
        console.log('Past the validPassword if statement.');
        let token = jwt.sign(users, config.jwt_secret, {
          expiresIn : 60*60*24
        });
        let content = {
          user: users,
          success: true,
          message: 'You logged in',
          token: token
        };
        res.send(content);
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
  });

  // User.findOne({'email' : reqUser.email}, (err, user) => {
  //
  //   if( err )
  //     return done(err);
  //
  //   if( !user ) {
  //     let content = {
  //       success: false,
  //       message: 'User does not exists'
  //     };
  //     res.send(content);
  //     return;
  //   }
  //
  //   if( !user.validPassword(reqUser.password) ){
  //     let content = {
  //       success: false,
  //       message: 'Incorrect password'
  //     };
  //     res.send(content);
  //     return;
  //   }
  //
  //   let token = jwt.sign(user, config.jwt_secret, {
  //     expiresIn : 60*60*24
  //   });
  //   let content = {
  //     user: user,
  //     success: true,
  //     message: 'You logged in',
  //     token: token
  //   };
  //   res.send(content);
  // })

});

module.exports = router;
