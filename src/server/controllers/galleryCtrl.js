var GalleryModel = require('../models/GalleryModel.js');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('../dbconnection');

var galleryCtrl = {

  read:function(callback){
    console.log('Reading all of Gallery.');
  return db.query("Select * from gallery",callback);
  },

  readById:function(id,callback) {
    console.log("Reading gallery by ID");
    return db.query("Select * from gallery where id=?",[id],callback);
  },

  create:function(req,callback){
    console.log('Inside galleryCtrl for Create: ' + JSON.stringify(req.galleryName));
    return db.query("Insert into gallery (galleryName, galleryDescription, galleryImage) values(?,?,?)", [req.galleryName, req.galleryDescription, req.galleryImage], callback);
  },

  update:function(id,req,callback) {
    console.log('Inside galleryCtrl for Update');
    return db.query("update gallery set galleryName=?,galleryDescription=?,galleryImage=? where id=?",[req.galleryName,req.galleryDescription,req.galleryImage,id],callback);
  },

  delete:function(id,callback){
    var delFile = '';
    db.query("Select * from gallery where id=?",[id], function(err, rows, fields) {
      delFile = rows[0].galleryImage;
        fs.unlinkSync('server/uploads/'+ delFile, function (err) {
          if (err) throw err;
          console.log('DELETION of image file from  the system server/uploads folder successful for: ' + delFile);
        });
    });
    return db.query("delete from gallery where id=?",[id],callback);
  }

};

module.exports = galleryCtrl;


// var GalleryModel = require('../models/GalleryModel.js');
// var fs = require('fs');
//
// module.exports = {
//
//   create: function(req, res, next) {
//     GalleryModel.create(req.body, function(err, response) {
//       if (err) {
//         console.log("Create Gallery error just happened");
//         return res.status(500).send(err);
//       } else {
//       console.log("Create Gallery successfully worked ");
//       res.status(200).send(response);
//     };
//     });
//   },
//
//   read: function(req, res, next) {
//     GalleryModel.find(req.query)
//       .exec(function(err, response) {
//         if (err) {
//           console.log("Read Gallery error just happened");
//           res.status(500).send(err);
//         }
//         console.log("Read Gallery successfully worked");
//         res.status(200).send(response);
//       });
//     },
//
//     readById: function(req, res, next) {
//       GalleryModel.findById(req.params.id, function(err, response) {
//         if (err) {
//           console.log("readById Gallery error just happened");
//           res.status(500).send(err);
//         }
//         console.log("readById Gallery successfully worked");
//         res.send(response);
//       });
//     },
//
//     update: function(req,res, next) {
//       var delFile = '';
//       GalleryModel.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
//         if (err) {
//           console.log("Update Gallery error just happened");
//           res.status(500).send(err);
//         }
//         if (response.galleryImage) {
//           delFile = response.galleryImage;
//           console.log('THE delFile in Update is showing as: ' + delFile);
//           if (response.galleryImage != req.body.galleryImage) {
//             fs.unlinkSync('server/uploads/' + delFile, function (err) {
//               if (err) throw err;
//               console.log("Deletion of image file from the system server/uploads folder successfull for: " + delFile);
//             });
//           }
//         }
//         console.log("Update Gallery successfully worked");
//         res.status(200).send(response);
//       });
//     },
//
//     delete: function(req, res, next) {
//       var delFile = '';
//       GalleryModel.findById(req.params.id, function(err, response) {
//         if (err) { res.status(500).send(err);}
//         delFile = response.galleryImage;
//         console.log('THE delFile shows as: ' + delFile);
//         if (response.galleryImage) {
//           fs.unlinkSync('server/uploads/' + delFile, function (err) {
//             if (err) throw err;
//             console.log("Deletion of image file from the system server/uploads folder successfull for: " + delFile);
//           });
//         }
//       });
//       GalleryModel.findByIdAndRemove(req.params.id, function(err, response) {
//         if (err) {
//           console.log("Delete Gallery error just happened");
//           res.status(500).send(err);
//         }
//         console.log("Delete Gallery successfully worked");
//         res.send(response);
//       });
//     }
//
// }
