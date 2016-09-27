var User = require('../models/UserModel.js');

module.exports = {

  register: function(req, res, next) {
    User.create(req.body, function(err, result) {
      if(err) return res.status(500).send(err);
      var newUser = result.toObject();
      newUser.password = null;
      res.status(200).send(newUser);
    });
  },

  me: function(req, res, next) {
    if (!req.user) return res.status(401).send('Current user not defined');
    req.user.adminNotes = null;
    req.user.password = null;
    return  res.status(200).send(req.user);
  },

  update: function(req, res, next) {
    User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
      if (err) next(err);
      res.status(200).send('User updated');
    });
  },

  read: function(req, res, next) {
    User.find({}, function(err, response) {
      if (err) {
        return res.status(500).send(err);
      } else {
        for (var i = 0; i < response.length; i++) {
          response[i].password = null;
        }
      }
      res.status(200).send(response);
    });
  },

delete: function(req, res, next) {
  User.findByIdAndRemove(req.params.id, function(err, serverResponse) {
    if (err) {
      return response.status(500).send(error);
    } else {
      res.status(200).send(serverResponse);
    }
  });
},

};
