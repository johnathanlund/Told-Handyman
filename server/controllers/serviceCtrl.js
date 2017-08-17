var ServiceModel = require('../models/ServiceModel.js');
var express = require('express');
var router = express.Router();

var db = require('../dbconnection');

var serviceCtrl = {

  read:function(callback){
    console.log('Reading all of Service.');
  return db.query("Select * from service",callback);
  },

  readById:function(id,callback) {
    console.log("Reading service by ID");
    return db.query("Select * from service where id=?",[id],callback);
  },

  create:function(req,callback){
    console.log('Inside serviceCtrl for Create: ' + JSON.stringify(req.serviceName));
    return db.query("Insert into service (serviceName, serviceDescription, serviceImage) values(?,?,?)", [req.serviceName,req.serviceDescription,req.serviceImage], callback);
  },

  update:function(id,req,callback) {
    console.log('Inside serviceCtrl for Update');
    return db.query("update service set serviceName=?,serviceDescription=?,serviceImage=? where id=?",[req.serviceName,req.serviceDescription,req.serviceImage,id],callback);
  },

  delete:function(id,callback){
    console.log('Inside serviceCtrl for Delete');
    return db.query("delete from service where id=?",[id],callback);
  }

};

module.exports = serviceCtrl;

// var ServiceModel = require('../models/ServiceModel.js');
// var fs = require('fs');
//
// module.exports = {
//
//   create: function(req, res, next) {
//     ServiceModel.create(req.body, function(err, response) {
//       // console.log('this is the req.body.name ' + req);
//       if (err) {
//         console.log("Create Service error just happened");
//         return res.status(500).send(err);
//       } else {
//       console.log("Create Service successfully worked ");
//       res.status(200).send(response);
//     };
//     });
//   },
//
//   read: function(req, res, next) {
//     ServiceModel.find(req.query)
//       .exec(function(err, response) {
//         if (err) {
//           console.log("Read Service error just happened");
//           res.status(500).send(err);
//         }
//         console.log("Read Service successfully worked");
//         res.status(200).send(response);
//       });
//     },
//
//   readById: function(req, res, next) {
//     ServiceModel.findById(req.params.id, function(err, response) {
//       if (err) {
//         console.log("readById Service error just happened");
//         res.status(500).send(err);
//       }
//       console.log("readById Service successfully worked");
//       res.send(response);
//     });
//   },
//
//   update: function(req,res, next) {
//     var delFile = '';
//     ServiceModel.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
//       if (err) {
//         console.log("Update Service error just happened");
//         res.status(500).send(err);
//       }
//       if (response.serviceImage) {
//         delFile = response.serviceImage;
//         console.log('THE delFile in Update is showing as: ' + delFile);
//         if (response.serviceImage != req.body.serviceImage) {
//           fs.unlinkSync('server/uploads/' + delFile, function (err) {
//             if (err) throw err;
//             console.log("Deletion of image file from the system server/uploads folder successfull for: " + delFile);
//           });
//         }
//       }
//       console.log("Update Service successfully worked");
//       res.status(200).send(response);
//     });
//   },
//
//   delete: function(req, res, next) {
//     var delFile = '';
//     ServiceModel.findById(req.params.id, function(err, response) {
//       if (err) { res.status(500).send(err);}
//       delFile = response.serviceImage;
//       console.log('THE delFile shows as: ' + delFile);
//       if (response.serviceImage) {
//         fs.unlinkSync('server/uploads/' + delFile, function (err) {
//           if (err) throw err;
//           console.log("Deletion of image file from the system server/uploads folder successfull for: " + delFile);
//         });
//       }
//     });
//     ServiceModel.findByIdAndRemove(req.params.id, function(err, response) {
//       if (err) {
//         console.log("Delete Service error just happened");
//         res.status(500).send(err);
//       }
//       console.log("Delete Service successfully worked");
//       res.send(response);
//     });
//   }
//
// };
