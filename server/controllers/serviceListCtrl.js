var ServiceListModel = require('../models/ServiceListModel.js');

module.exports = {

  create: function(req, res, next) {
    console.log('This is the service list req.params.id ' + req.params.id);
    ServiceListModel.create(req.body, function(err, response) {
      console.log('this is the service list req.body.name ' + req);
      if (err) {
        console.log("Create Service List error just happened");
        return res.status(500).send(err);
      } else {
      console.log("Create Service List successfully worked ");
      res.status(200).send(response);
    };
    });
  },

  read: function(req, res, next) {
    ServiceListModel.find(req.query)
      .exec(function(err, response) {
        if (err) {
          console.log("Read Service List error just happened");
          res.status(500).send(err);
        }
        console.log("Read Service List successfully worked");
        res.status(200).send(response);
      });
    },

  readById: function(req, res, next) {
    ServiceListModel.findById(req.params.id, function(err, response) {
      if (err) {
        console.log("readById Service List error just happened");
        res.status(500).send(err);
      }
      console.log("readById Service List successfully worked");
      res.send(response);
    });
  },

  update: function(req,res, next) {
    ServiceListModel.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
      if (err) {
        console.log("Update Service List error just happened");
        res.status(500).send(err);
      }
      console.log("Update Service List successfully worked");
      res.status(200).send(response);
    });
  },

  delete: function(req, res, next) {
    ServiceListModel.findByIdAndRemove(req.params.id, function(err, response) {
      if (err) {
        console.log("Delete Service List error just happened");
        res.status(500).send(err);
      }
      console.log("Delete Service List successfully worked");
      res.send(response);
    });
  }

};
