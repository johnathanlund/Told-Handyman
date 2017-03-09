var ServiceModel = require('../models/ServiceModel.js');
var fs = require('fs');

module.exports = {

  create: function(req, res, next) {
    ServiceModel.create(req.body, function(err, response) {
      // console.log('this is the req.body.name ' + req);
      if (err) {
        console.log("Create Service error just happened");
        return res.status(500).send(err);
      } else {
      console.log("Create Service successfully worked ");
      res.status(200).send(response);
    };
    });
  },

  read: function(req, res, next) {
    ServiceModel.find(req.query)
      .exec(function(err, response) {
        if (err) {
          console.log("Read Service error just happened");
          res.status(500).send(err);
        }
        console.log("Read Service successfully worked");
        res.status(200).send(response);
      });
    },

  readById: function(req, res, next) {
    ServiceModel.findById(req.params.id, function(err, response) {
      if (err) {
        console.log("readById Service error just happened");
        res.status(500).send(err);
      }
      console.log("readById Service successfully worked");
      res.send(response);
    });
  },

  update: function(req,res, next) {
    ServiceModel.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
      if (err) {
        console.log("Update Service error just happened");
        res.status(500).send(err);
      }
      console.log("Update Service successfully worked");
      res.status(200).send(response);
    });
  },

  delete: function(req, res, next) {
    var delFile = '';
    ServiceModel.findById(req.params.id, function(err, response) {
      if (err) { res.status(500).send(err);}
      delFile = response.serviceImage;
      console.log('THE delFile shows as: ' + delFile);
    });
    ServiceModel.findByIdAndRemove(req.params.id, function(err, response) {
      if (err) {
        console.log("Delete Service error just happened");
        res.status(500).send(err);
      }
      fs.unlinkSync('server/uploads/' + delFile, function (err) {
        if (err) throw err;
        console.log("Deletion of image file from the system server/uploads folder successfull for: " + delFile);
      });
      console.log("Delete Service successfully worked");
      res.send(response);
    });
  }

};
