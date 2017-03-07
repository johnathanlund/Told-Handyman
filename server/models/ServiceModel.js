var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema ({
  serviceName: {type: String},
  serviceDescription: {type: String},
  serviceImage: {type: String},
});

module.exports = mongoose.model('Service', ServiceSchema);
