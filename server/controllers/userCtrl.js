var User = require('../models/UserModel.js');

module.exports = {
  //----------------User Login Ctrls---------------------------------
    addUser: function(req, res) {
        new User(req.body).save(function(err, user) {
            if (err) {
       console.error('error: ', err);
                res.status(500).send(err);
            } else {
       console.log('Success in adding new user');
                console.log(user);
                res.send(user);
            }
        });
    },
    getUser: function(req, res) {
      console.log('hi from getUser');
           User.findById( req.query.id, function(err, user) {
             console.log('In userCtrl getUser, in findById.');
               if (err) {
                   // return console.error(err);
                   console.log('In userCtrl getUser, in findById IF error.');
          res.statu(500).send(err);
               } else {
                 console.log('In userCtrl getUser, in findById IF statement.');
                   res.send(user);
               }
           });
    },
    getCurrentUser: function(req, res) {
      console.log('In the getCurrentUser function in userCtrl.');
      if(req.user){
        console.log("login found the User");
        res.status(200).send(req.user);
      } else {
        console.log('In userCtrl getCurrentUser, in the if else.');
        res.status(403).send('forbidden');
        }
    },
    logout: function(req, res) {
      console.log('In the logout function.');
       req.logout();
       console.log('In the logout function, USER ' + req.user.name + ' has been logged out.');
       res.redirect('/');
     },
    isAuth: function(req,res, next) {
      console.log('In userCtrl isAuth.');
      if(req.user) {
        console.log('In userCtrl isAuth IF');
        next();
      } else {
        console.log('In userCtrl isAuth IF else error');
        res.status(403).send('Not Permitted');
      }
      console.log('In userCtrl isAuth, past IF statement.');
    },

  }
