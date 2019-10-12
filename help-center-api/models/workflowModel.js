var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WorkflowModelSchema = new Schema({
  workflow : {type:String},
  workflowType :{type:String},
  description :{type:String},  
  modifiedOn  :  {type:Date},
  createdOn  : {type:Date},
});

module.exports = mongoose.model('Workflow', WorkflowModelSchema );