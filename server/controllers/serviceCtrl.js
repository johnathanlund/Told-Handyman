var Service = require('../models/ServiceModel.js');
var multer = require('multer');

// Multer settings for handling file uploads.
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('In the Server, Storage, Destination function.');
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      console.log('In the Server, Storage, filename function.');
      var datetimestamp = Date.now();
      cb(null, file.originalname + '-' + datetimestamp);
    }
  });

  var upload = multer({storage: storage, limits: { parts: 3 }}).single('serviceImage');

module.exports = {
  // console.log('In the serviceCtrl file.');

  // create: function(req, res, next) {
  //   console.log('This is the req.params.id ' + req.params.id);
  //   ServiceModel.create(req.body, function(err, response) {
  //     console.log('this is the req.body.name ' + req);
  //     if (err) {
  //       console.log("Create Service error just happened");
  //       return res.status(500).send(err);
  //     } else {
  //     console.log("Create Service successfully worked ");
  //     res.status(200).send(response);
  //   };
  //   });
  // },

  // create: function(req, res, next) {
  //   console.log('ServiceCtrl inside Create function.');
  //   console.log('ServiceCtrl req.body shows as: ' + JSON.stringify(req.body));
  //   console.log('ServiceCtrl shows the req.file as:  ' + req.file);
  //   upload(req, res, function (err) {
  //     console.log('Inside the Create, Upload function.');
  //     if (err) {
  //       console.log(err);
  //       return res.status(422).send("an Error occured.")
  //     }
  //     console.log('This is the UPLOAD file json of req.file:   ' + JSON.stringify(req.file));
  //     next();
  //   });
  //   console.log('Past the Create, Upload function.');
  //   console.log('In Server, Create, req.body shows as: ' + req.file);
  //   // console.log('Server, Create, json of req.body' + JSON.parse(req.body.serviceName));
  //   var serviceForm = new ServiceModel({
  //     serviceName: req.body.serviceName,
  //     serviceDescription: req.body.serviceDescription,
  //     serviceImage: req.file.filename
  //   });
  //   console.log('Past the Create, serviceForm lines.');
  //   serviceForm.save(function (err, result) {
  //     if (err) {
  //       console.log('ServiceCtrl Create error on serviceForm.save');
  //       res.status(404).send(err);
  //     }
  //     console.log('Successfull on Server Create new Service!');
  //     res.status(201).send(result);
  //   })
  // },

  create: function(req, res, next) {
    console.log('ServiceCtrl inside Create function.');
    console.log('ServiceCtrl req.body shows as: ' + JSON.stringify(req.body));
    console.log('ServiceCtrl shows the req.file as:  ' + res.file);
    var uploadRes = ''
    upload(req, res, function (err) {
      console.log('Inside the upload function within Post.');
       if (err) {
         console.log(err);
         return res.status(422).send("an Error occured")
       }
       console.log('This is the UPLOAD file json of req.file.filename:   ' + JSON.stringify(req.file.filename));
       uploadRes = res;
     });
     console.log('Past the Create, Upload function.');
    var serviceForm = new Service({
      serviceName: req.body.serviceName,
      serviceDescription: req.body.serviceDescription,
      serviceImage: req.file.filename
    });
    serviceForm.save(function (err, result) {
      if (err) {
        console.log('ServiceCtrl Create error on serviceForm.save');
        res.status(404).send(err);
      }
      res.status(201).send(result);
    })
  },

  read: function(req, res, next) {
    Service.find(req.query)
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
