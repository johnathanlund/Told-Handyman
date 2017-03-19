var User = require('../models/UserModel.js');
var jwt = require('jsonwebtoken');
var config = require('../config');
var express = require('express');
var app = express();
var router = express.Router();
var auth = require('../services/auth');

router.get('/check-state', auth.verifyToken, (req, res) => {
  let content = {
    success: true,
    message: 'Successfully logged in.'
  }
  res.send(content);
});

router.post('/register', (req, res) => {

  var reqUser = req.body;

  process.nextTick( () => {
    User.findOne({ 'email': reqUser.email }, (err, user) => {
      if(err)
        return done(err);

      if(user){
        let content = {
          success: false,
          message: 'user already exists'
        };
        res.send(content);
        return;
      } else {
        var newUser = new User();
        newUser.name = reqUser.name;
        newUser.email = reqUser.email;
        newUser.password = newUser.generateHash(reqUser.password);
        newUser.save( (err) => {
            if( err )
                throw err;

            let token = jwt.sign(newUser, config.jwt_secret, {
              expiresIn : 60*60*24
            });
            let content = {
              user: newUser,
              success: true,
              message: 'You created a new user',
              token: token
            };
            res.send(content);
            return;
        })
      }
    })
  })
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

// module.exports = {
  //----------------User Login Ctrls---------------------------------
    // addUser: function(req, res) {
    //   let user = new User({
    //     name: req.body.name,
    //     loginEmail: req.body.loginEmail,
    //     loginPassword: req.body.loginPassword
    //   });
    //   user.save(function(err, data) {
    //     if (err) {
    //       console.log('userCtrl shows the error as: ' + err);
    //       return res.json({error: true});
    //     }
    //     res.json({error: false});
    //   })
    // },
    // addUser: function(req, res) {
    //   req.body._id = Math.random() + Date.now();
    //   req.body.email_1 = Date.now();
    //     new Users(req.body).save(function(err, user) {
    //         if (err) {
    //    console.error('error: ', err);
    //             res.status(500).send(err);
    //         } else {
    //    console.log('Success in adding new user');
    //             console.log(user);
    //             res.send(user);
    //         }
    //     });
    // },
    // createUser: function(req, res) {
    //   var deferred = Q.defer();
    // // set user object to userParam without the cleartext password
    // var user = _.omit(req.body, 'password');
    //
    // // add hashed password to user object
    // user.hash = bcrypt.hashSync(req.body.password, 10);
    //
    // new Users(user).save(function(err, user) {
    //   if (err) deferred.reject(err.name + ': ' + err.message);
    //
    //   deferred.resolve();
    //   res.sendStatus(200);
    // });

    // Users.insert(
    //     user,
    //     function (err, doc) {
    //         if (err) deferred.reject(err.name + ': ' + err.message);
    //
    //         deferred.resolve();
    //     });
//         return deferred.promise;
// },

    // userAuthenticate: function(req, res) {
    //   let data = {
    //     loginEmail: req.body.loginEmail,
    //     loginPassword: req.body.loginPassword
    //   };
    //   User.findOne(data).lean().exec(function (err, user) {
    //     if (err) {
    //       console.log('userCtrl userAuthenticate shows error as: ' + err);
    //       return res.json({error: true});
    //     }
    //     if (!user) {
    //       return res.status(404).json({'message': 'User not found!'});
    //     }
    //     console.log('userCtrl in userAuthenticate shows user as: ' + user);
    //     let token = jwt.sign(user, config.jwt_secret, {
    //       expiresIn: 1440 // expires in 1 hour
    //     });
    //     res.json({error: false, token: token});
    //   })
    // },
    // getUser: function(req, res) {
    //   console.log('hi from getUser');
    //        User.findById( req.query.id, function(err, user) {
    //          console.log('In userCtrl getUser, in findById.');
    //            if (err) {
    //                // return console.error(err);
    //                console.log('In userCtrl getUser, in findById IF error.');
    //       res.statu(500).send(err);
    //            } else {
    //              console.log('In userCtrl getUser, in findById IF statement.');
    //                res.send(user);
    //            }
    //        });
    // },
    // getCurrentUser: function(req, res) {
    //   console.log('In the getCurrentUser function in userCtrl.');
    //   if(req.user){
    //     console.log("login found the User");
    //     res.status(200).send(req.user);
    //   } else {
    //     console.log('In userCtrl getCurrentUser, in the if else.');
    //     res.status(403).send('forbidden');
    //     }
    // },

    // authenticate: function(req, res) {
    //   var deferred = Q.defer();
    //   var username = req.body.username;
    //   var password = req.body.password;
    //   Users.findOne({ username: username }, function (err, user) {
    //     if (err) {
    //       deferred.reject(err.name + ': ' + err.message);
    //     }
    //     if (user && bcrypt.compareSync(password, user.hash)) {
    //       deferred.resolve({
    //         _id: user._id,
    //         username: user.username,
    //         name: user.name,
    //         token: jwt.sign({ sub: user._id }, config.jwt_secret)
    //       });
    //     } else {
    //         deferred.resolve();
    //     }
    //   });
    //   return deferred.promise;
    // },
    //
    // logout: function(req, res) {
    //   console.log('In the logout function.');
    //    req.logout();
    //    console.log('In the logout function, USER ' + req.user.name + ' has been logged out.');
    //    res.redirect('/');
    //  },
    // isAuth: function(req,res, next) {
    //   console.log('In userCtrl isAuth.');
    //   if(req.user) {
    //     console.log('In userCtrl isAuth IF');
    //     next();
    //   } else {
    //     console.log('In userCtrl isAuth IF else error');
    //     res.status(403).send('Not Permitted');
    //   }
    //   console.log('In userCtrl isAuth, past IF statement.');
    // },

  // }
