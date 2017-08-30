var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/UserModel');

passport.use(new LocalStrategy({
  usernameField: 'loginEmail',
  passwordField: 'loginPassword'
}, function(loginEmail, loginPassword, done) {
  console.log('In passport.use function.');
  User.findOne({ loginEmail: loginEmail })
  .exec(function(err, user) {
    console.log('In passport.use function .exec function');
    if(err) done(err);
    console.log('In passport.use function .exec function if(err)');
    if(!user) return done(null, false);
    console.log('In passport.use function .exec function if(!user)');
    if(user.verifyPassword(loginPassword)) return done(null, user);
    console.log('In passport IF for verifyPassword.');
    return done(null, false);
    console.log('In passport IF for verifyPassword, past the return.');
  });
  console.log('In passport.use function, past the .exec.');
}));

passport.serializeUser(function(user, done) {
  console.log('In passport.serializeUser');
  console.log('In passport.serializeUser user is: ' + user.name);
  done(null, user._id);
});

console.log('Past passport.serializeUser');

passport.deserializeUser(function(_id, done) {
  console.log('In passport.deserializeUser.');
  User.findById(_id, function(err, user) {
    console.log('In passport.deserializeUser, in User.findById');
    console.log('In passport.deserializeUser, user is: ' + user.name);
    done(err, user);
  });
});

module.exports = passport;
