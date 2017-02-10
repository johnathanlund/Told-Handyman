var ServiceModel = require('../models/ServiceModel.js');

module.exports = {

  create: function(req, res, next) {
    console.log('This is the req.params.id ' + req.params.id);
    ServiceModel.create(req.body, function(err, response) {
      console.log('this is the req.body.name ' + req);
      if (err) {
        console.log("Create Service error just happened");
        return res.status(500).send(err);
      } else {
      console.log("Create Service successfully worked ");
      res.status(200).send(response);
    };
    });
  },
  // create: function(req, res, next) {
  //
  //     Service.create(req.body, function(err, response) {
  //         if (err) {
  //           return res.status(500).send(err);
  //         }
  //         res.status(200).send(response);
  //     });
  // },
// create: function(req, res) {
//     var newService = new Service(req.body);
//     newService.save(function(err, response) {
//       if(err) {
//         console.log('Error has occured on create');
//         res.status(500).json(err)
//       }else {
//         console.log("Success in creating new Service");
//         res.status(200).send(response);
//       }
//     });
// },

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

    Service.findById(req.params.id, function(err, response) {
      if (err) {
        console.log("readById Service error just happened");
        res.status(500).send(err);
      }
      console.log("readById Service successfully worked");
      res.send(response);
    });
  },

  update: function(req,res, next) {

    Service.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
      if (err) {
        console.log("Update Service error just happened");
        res.status(500).send(err);
      }
      console.log("Update Service successfully worked");
      res.status(200).send(response);
    });
  },

  delete: function(req, res, next) {

    Service.findByIdAndRemove(req.params.id, function(err, response) {
      if (err) {
        console.log("Delete Service error just happened");
        res.status(500).send(err);
      }
      console.log("Delete Service successfully worked");
      res.send(response);
    });
  }

};
