var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceListSchema = new Schema ({
  serviceListName: {type: String},
  serviceListDescription: {type: String}
});

module.exports = mongoose.model('ServiceList', ServiceListSchema);
