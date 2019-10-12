var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LogSchema = new Schema(
  {
    username: {type: String},
    action:{type: String},
    workflow:{type: String},
    createdOn: {type: Date , default:Date.now},
  }
);
module.exports = mongoose.model('Log', LogSchema);
