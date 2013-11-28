var mongoose = require('mongoose');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Url = new Schema({
	url : String,
	name: String
});

var Environment = new Schema({
	name: { type: String, required: true},
	project : ObjectId ,
	urls : [Url]
});

module.exports = Environment;