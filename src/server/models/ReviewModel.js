var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema ({
  reviewAuthor: {type: String},
  reviewLocation: {type: String},
  reviewMessage: {type: String},
  reviewImage: {type: String}
});

module.exports = mongoose.model('Review', ReviewSchema);
