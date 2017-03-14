var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var User = new Schema({
  name: {type: String},
  loginEmail: {type: String, unique: true},
  loginPassword: {type: String},
});

User.methods.generateHash = function( loginPassword ) {
  console.log('In UserModel, generateHash');
    return bcrypt.hashSync(loginPassword, bcrypt.genSaltSync(8), null);
};
User.methods.verifyPassword = function( loginPassword, res, err ) {
  console.log('Password has been verified, in UserModel.');
  console.log('Password has been verified, in UserModel. loginPassword is: ' + loginPassword);
  console.log('Password has been verified, in UserModel. this.loginPassword is: ' + this.loginPassword);
  // if (loginPassword == this.loginPassword) {
  //   if (err) {
  //     return err;
  //   } else {
  //     return res.status(200);
  //   }
  // }
  // return true;
    return bcrypt.compareSync(loginPassword, this.loginPassword);
};
//////////?//////////////////
User.pre('save', function(next){
  console.log('In UserModel user.pre');
var user = this;
console.log('In UserModel user.pre, past var user.');
if(!user.isModified('loginPassword')) return next();
console.log('In UserModel user.pre, past if statement');
user.loginPassword = User.methods.generateHash(user.loginPassword);
console.log('In UserModel user.pre, past user.loginPassword');
next();
});

module.exports = mongoose.model('User', User);
