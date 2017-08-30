var ServiceListModel = require('../models/ServiceListModel.js');
var express = require('express');
var router = express.Router();
// var fs = require('fs');
var db = require('../dbconnection');

var serviceListCtrl = {

  read:function(callback){
    console.log('Reading all of Service List.');
  return db.query("Select * from servicelist",callback);
  },

  readById:function(id,callback) {
    console.log("Reading serviceList by ID");
    return db.query("Select * from servicelist where id=?",[id],callback);
  },

  create:function(req,callback){
    console.log('Inside serviceListCtrl for Create: ' + JSON.stringify(req.serviceListName));
    return db.query("Insert into servicelist (serviceListName, serviceListDescription) values(?,?)", [req.serviceListName,req.serviceListDescription], callback);
  },

  update:function(id,req,callback) {
    console.log('Inside serviceListCtrl for Update');
    return db.query("update servicelist set serviceListName=?,serviceListDescription=? where id=?",[req.serviceListName,req.serviceListDescription,id],callback);
  },

  delete:function(id,callback){
    console.log('Inside serviceListCtrl for Delete');
    return db.query("delete from servicelist where id=?",[id],callback);
  }

  // delete:function(id,callback){
  //   var delFile = '';
  //   db.query("Select * from serviceList where id=?",[id], function(err, rows, fields) {
  //     delFile = rows[0].serviceListImage;
  //       fs.unlinkSync('server/uploads/'+ delFile, function (err) {
  //         if (err) throw err;
  //         console.log('DELETION of image file from  the system server/uploads folder successful for: ' + delFile);
  //       });
  //   });
  //   return db.query("delete from serviceList where id=?",[id],callback);
  // }

};

module.exports = serviceListCtrl;


// router.get('/:id?', function(req, res, next) {
//   if(req.params.id){
//     ServiceListModel.readById(req.params.id,function(err,rows){
//       if(err) {
//         res.json(err);
//       } else {
//         res.json(rows);
//       }
//     });
//   } else {
//     ServiceListModel.read(function(err,rows) {
//       if(err) {
//         res.json(err);
//       } else {
//         res.json(rows);
//       }
//     });
//   }
// });


// var ServiceListModel = require('../models/ServiceListModel.js');
//
// module.exports = {
//
//   create: function(req, res, next) {
//     console.log('This is the service list req.params.id ' + req.params.id);
//     ServiceListModel.create(req.body, function(err, response) {
//       console.log('this is the service list req.body.name ' + req);
//       if (err) {
//         console.log("Create Service List error just happened");
//         return res.status(500).send(err);
//       } else {
//       console.log("Create Service List successfully worked ");
//       res.status(200).send(response);
//     };
//     });
//   },
//
//   read: function(req, res, next) {
//     ServiceListModel.find(req.query)
//       .exec(function(err, response) {
//         if (err) {
//           console.log("Read Service List error just happened");
//           res.status(500).send(err);
//         }
//         console.log("Read Service List successfully worked");
//         res.status(200).send(response);
//       });
//     },
//
//   readById: function(req, res, next) {
//     ServiceListModel.findById(req.params.id, function(err, response) {
//       if (err) {
//         console.log("readById Service List error just happened");
//         res.status(500).send(err);
//       }
//       console.log("readById Service List successfully worked");
//       res.send(response);
//     });
//   },
//
//   update: function(req,res, next) {
//     ServiceListModel.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
//       if (err) {
//         console.log("Update Service List error just happened");
//         res.status(500).send(err);
//       }
//       console.log("Update Service List successfully worked");
//       res.status(200).send(response);
//     });
//   },
//
//   delete: function(req, res, next) {
//     ServiceListModel.findByIdAndRemove(req.params.id, function(err, response) {
//       if (err) {
//         console.log("Delete Service List error just happened");
//         res.status(500).send(err);
//       }
//       console.log("Delete Service List successfully worked");
//       res.send(response);
//     });
//   }
//
// };
