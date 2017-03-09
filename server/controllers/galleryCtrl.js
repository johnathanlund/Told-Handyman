var GalleryModel = require('../models/GalleryModel.js');
var fs = require('fs');

module.exports = {

  create: function(req, res, next) {
    GalleryModel.create(req.body, function(err, response) {
      if (err) {
        console.log("Create Gallery error just happened");
        return res.status(500).send(err);
      } else {
      console.log("Create Gallery successfully worked ");
      res.status(200).send(response);
    };
    });
  },

  read: function(req, res, next) {
    GalleryModel.find(req.query)
      .exec(function(err, response) {
        if (err) {
          console.log("Read Gallery error just happened");
          res.status(500).send(err);
        }
        console.log("Read Gallery successfully worked");
        res.status(200).send(response);
      });
    },

    readById: function(req, res, next) {
      GalleryModel.findById(req.params.id, function(err, response) {
        if (err) {
          console.log("readById Gallery error just happened");
          res.status(500).send(err);
        }
        console.log("readById Gallery successfully worked");
        res.send(response);
      });
    },

    update: function(req,res, next) {
      GalleryModel.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
        if (err) {
          console.log("Update Gallery error just happened");
          res.status(500).send(err);
        }
        console.log("Update Gallery successfully worked");
        res.status(200).send(response);
      });
    },

    delete: function(req, res, next) {
      var delFile = '';
      GalleryModel.findById(req.params.id, function(err, response) {
        if (err) { res.status(500).send(err);}
        delFile = response.galleryImage;
        console.log('THE delFile shows as: ' + delFile);
      });
      GalleryModel.findByIdAndRemove(req.params.id, function(err, response) {
        if (err) {
          console.log("Delete Gallery error just happened");
          res.status(500).send(err);
        }
        fs.unlinkSync('server/uploads/' + delFile, function (err) {
          if (err) throw err;
          console.log("Deletion of image file from the system server/uploads folder successfull for: " + delFile);
        });
        console.log("Delete Gallery successfully worked");
        res.send(response);
      });
    }

}
