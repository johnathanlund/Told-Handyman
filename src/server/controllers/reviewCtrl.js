var ReviewModel = require('../models/ReviewModel.js');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('../dbconnection');

var reviewCtrl = {

  read:function(callback){
    console.log('Reading all of Review.');
  return db.query("Select * from review",callback);
  },

  readById:function(id,callback) {
    console.log("Reading review by ID");
    return db.query("Select * from review where id=?",[id],callback);
  },

  create:function(req,callback){
    console.log('Inside reviewCtrl for Create: ' + JSON.stringify(req.reviewAuthor));
    return db.query("Insert into review (reviewAuthor,reviewLocation,reviewMessage,reviewImage) values(?,?,?,?)", [req.reviewAuthor,req.reviewLocation,req.reviewMessage,req.reviewImage], callback);
  },

  update:function(id,req,callback) {
    console.log('Inside reviewCtrl for Update');
    return db.query("update review set reviewAuthor=?,reviewLocation=?,reviewMessage=?,reviewImage=? where id=?",[req.reviewAuthor,req.reviewLocation,req.reviewMessage,req.reviewImage,id],callback);
  },

  // delete:function(id,callback){
  //   console.log('Inside reviewCtrl for Delete');
  //   return db.query("delete from review where id=?",[id],callback);
  // }

  delete:function(id,callback){
    var delFile = '';
    db.query("Select * from review where id=?",[id], function(err, rows, fields) {
      delFile = rows[0].reviewImage;
        fs.unlinkSync('server/uploads/'+ delFile, function (err) {
          if (err) throw err;
          console.log('DELETION of image file from  the system server/uploads folder successful for: ' + delFile);
        });
    });
    return db.query("delete from review where id=?",[id],callback);
  }

};

module.exports = reviewCtrl;

// var ReviewModel = require('../models/ReviewModel.js');
// var fs = require('fs');
//
// module.exports = {
//
//   create: function(req, res, next) {
//     ReviewModel.create(req.body, function(err, response) {
//       if (err) {
//         console.log("Create Review error just happened");
//         return res.status(500).send(err);
//       } else {
//       console.log("Create Review successfully worked ");
//       res.status(200).send(response);
//     };
//     });
//   },
//
//   read: function(req, res, next) {
//     ReviewModel.find(req.query)
//       .exec(function(err, response) {
//         if (err) {
//           console.log("Read Review error just happened");
//           res.status(500).send(err);
//         }
//         console.log("Read Review successfully worked");
//         res.status(200).send(response);
//       });
//     },
//
//   readById: function(req, res, next) {
//     ReviewModel.findById(req.params.id, function(err, response) {
//       if (err) {
//         console.log("readById Review error just happened");
//         res.status(500).send(err);
//       }
//       console.log("readById Review successfully worked");
//       res.send(response);
//     });
//   },
//
//   update: function(req,res, next) {
//     var delFile = '';
//     ReviewModel.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
//       if (err) {
//         console.log("Update Review error just happened");
//         res.status(500).send(err);
//       }
//       if (response.reviewImage) {
//         delFile = response.reviewImage;
//         console.log('THE delFile in Update is showing as: ' + delFile);
//         if (response.reviewImage != req.body.reviewImage) {
//           fs.unlinkSync('server/uploads/' + delFile, function (err) {
//             if (err) throw err;
//             console.log("Deletion of image file from the system server/uploads folder successfull for: " + delFile);
//           });
//         }
//       }
//       console.log("Update Review successfully worked");
//       res.status(200).send(response);
//     });
//   },
//
//   delete: function(req, res, next) {
//     var delFile = '';
//     ReviewModel.findById(req.params.id, function(err, response) {
//       if (err) { res.status(500).send(err);}
//       delFile = response.reviewImage;
//       console.log('THE delFile shows as: ' + delFile);
//       if (response.reviewImage) {
//         fs.unlinkSync('server/uploads/' + delFile, function (err) {
//           if (err) throw err;
//           console.log("Deletion of image file from the system server/uploads folder successfull for: " + delFile);
//         });
//       }
//     });
//     ReviewModel.findByIdAndRemove(req.params.id, function(err, response) {
//       if (err) {
//         console.log("Delete Review error just happened");
//         res.status(500).send(err);
//       }
//       console.log("Delete Review successfully worked");
//       res.send(response);
//     });
//   }
//
// };
