var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var User = new Schema({
  name: {type: String},
  email: {type: String, unique: true, required: true},
  password: {type: String},
});

User.methods.generateHash = function( password ) {
  console.log('In UserModel, generateHash');
    return bcrypt.hashSync( password, bcrypt.genSaltSync(8), null);
};
User.methods.validPassword = function( password, res, err ) {
  console.log('Password has been verified, in UserModel.');
    return bcrypt.compareSync( password, this.password );
};
//////////?//////////////////
// User.pre('save', function(next){
//   console.log('In UserModel user.pre');
// var user = this;
// console.log('In UserModel user.pre, past var user.');
// if(!user.isModified('loginPassword')) return next();
// console.log('In UserModel user.pre, past if statement');
// user.loginPassword = User.methods.generateHash(user.loginPassword);
// console.log('In UserModel user.pre, past user.loginPassword');
// next();
// });

module.exports = mongoose.model('User', User);
