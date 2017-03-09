var ServiceModel = require('../models/ServiceModel.js');
var fs = require('fs');

module.exports = {

  create: function(req, res, next) {
    console.log('This is the req.body.serviceName ' + req.body.serviceName);
    console.log('This is the req.body.serviceImage: ' + req.body.serviceImage);
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
      console.log('In the readById, response.serviceImage shows as: ' + response.serviceImage + ' & the JSON is: ' + JSON.stringify(response.serviceImage));
      fs.stat('../uploads/' + response.serviceImage, function (err, stat) {
        console.log('In the FS function.');
        if (err == null) {
          console.log("FS shows the that " + response.serviceImage + " exists.");
        }
      });
      console.log("readById Service successfully worked");
      res.send(response);
    });
  },

  update: function(req,res, next) {
    console.log('In the serviceCtrl, Update. req.body.serviceImage is: ' + req.body.serviceImage);
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
      console.log('In the serviceCtrl, Delete, findById. Response Image is showing: ' + response.serviceImage);
      delFile = response.serviceImage;
      console.log('THE delFile shows as: ' + delFile);
    });
    console.log('In the serviceCtrl, Delete. req.body: ' + req.body + ' & the JSON of that is: ' + JSON.stringify(req.body));
    ServiceModel.findByIdAndRemove(req.params.id, function(err, response) {
      if (err) {
        console.log("Delete Service error just happened");
        res.status(500).send(err);
      }
      fs.unlinkSync('server/uploads/' + delFile, function (err) {
        if (err) throw err;
        console.log("Deletion of image file successfull for: " + delFile);
      });
      console.log("Delete Service successfully worked");
      res.send(response);
    });
  }

};
