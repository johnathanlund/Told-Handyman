var ReviewModel = require('../models/ReviewModel.js');
var fs = require('fs');

module.exports = {

  create: function(req, res, next) {
    ReviewModel.create(req.body, function(err, response) {
      if (err) {
        console.log("Create Review error just happened");
        return res.status(500).send(err);
      } else {
      console.log("Create Review successfully worked ");
      res.status(200).send(response);
    };
    });
  },

  read: function(req, res, next) {
    ReviewModel.find(req.query)
      .exec(function(err, response) {
        if (err) {
          console.log("Read Review error just happened");
          res.status(500).send(err);
        }
        console.log("Read Review successfully worked");
        res.status(200).send(response);
      });
    },

  readById: function(req, res, next) {
    ReviewModel.findById(req.params.id, function(err, response) {
      if (err) {
        console.log("readById Review error just happened");
        res.status(500).send(err);
      }
      console.log("readById Review successfully worked");
      res.send(response);
    });
  },

  update: function(req,res, next) {
    ReviewModel.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
      if (err) {
        console.log("Update Review error just happened");
        res.status(500).send(err);
      }
      console.log("Update Review successfully worked");
      res.status(200).send(response);
    });
  },

  delete: function(req, res, next) {
    var delFile = '';
    ReviewModel.findById(req.params.id, function(err, response) {
      if (err) { res.status(500).send(err);}
      delFile = response.reviewImage;
      console.log('THE delFile shows as: ' + delFile);
    });
    ReviewModel.findByIdAndRemove(req.params.id, function(err, response) {
      if (err) {
        console.log("Delete Review error just happened");
        res.status(500).send(err);
      }
      fs.unlinkSync('server/uploads/' + delFile, function (err) {
        if (err) throw err;
        console.log("Deletion of image file from the system server/uploads folder successfull for: " + delFile);
      });
      console.log("Delete Review successfully worked");
      res.send(response);
    });
  }

};
