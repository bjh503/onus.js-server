var mongoose = require('mongoose');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Person = new Schema({
    name	: {
        first: String,
        last : String
    },
   	email	: { type: String, required: true, index: { unique: true, sparse: true } },
   	alive	: Boolean
});

/**
 * Not really sure yet!
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Person.methods.getAllProjects = function(callback){
	return thid.db.model('Project').findById(this.owner, callback);
}

module.exports = Person;