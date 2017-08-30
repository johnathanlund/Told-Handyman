var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GallerySchema = new Schema ({
  galleryName: {type: String},
  galleryDescription: {type: String},
  galleryImage: {type: String}
});

module.exports = mongoose.model('Gallery', GallerySchema);
