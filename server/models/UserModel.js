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

module.exports = mongoose.model('User', User);

// var bcrypt = require('bcryptjs');
// var db = require('../dbconnection');
//
// var User = {
// 
//   register:function(req,res) {
//     var today = new Date();
//     var users = {
//       "name":req.body.name,
//       "email":req.body.email,
//       "password":req.body.password,
//       "created":today,
//       "modified":today
//     };
//     console.log('Inside UserModel for register: ' + JSON.stringify(users));
//     db.query('insert into users set ?',users, function (error, results, fields) {
//       if (error) {
//     console.log("error ocurred",error);
//     res.send({
//       "code":400,
//       "failed":"error ocurred"
//     })
//   }else{
//     console.log('The solution is: ', results);
//     res.send({
//       "code":200,
//       "success":"user registered sucessfully"
//         });
//   }
//     });
//   },
//
//   login:function(req,res) {
//     var email= req.body.email;
//   var password = req.body.password;
//   db.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
//   if (error) {
//     console.log("error ocurred",error);
//     res.send({
//       "code":400,
//       "failed":"error ocurred"
//     })
//   }else{
//     console.log('The solution is: ', results);
//     if(results.length >0){
//       if([0].password == password){
//         res.send({
//           "code":200,
//           "success":"login sucessfull"
//             });
//       }
//       else{
//         res.send({
//           "code":204,
//           "success":"Email and password does not match"
//         });
//     }
//   }
//   else{
//     res.send({
//       "code":204,
//       "success":"Email does not exits"
//         });
//   }
// }
// });
// }
//   };
//
// module.exports = User;
