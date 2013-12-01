var mongoose = require('mongoose');
var Environment = require('./environment');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Project = new Schema({
	name	: { type: String, required: true},
    environments: [{ type: ObjectId, ref: 'Environment'}]
});

module.exports = Project;