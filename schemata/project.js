var mongoose = require('mongoose');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Project = new Schema({
	name	: { type: String, required: true},
	owner 	: Schema.ObjectId
});

module.exports = Project;