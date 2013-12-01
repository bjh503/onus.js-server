var mongoose = require('mongoose');
var Report = require('./report');
var Person = require('./person');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Environment = new Schema({
	name: { type: String, required: true},
	url : { type: String, required: true},
    reports: [Report],
    project: {type: ObjectId, ref: 'Project'}
});

Environment.methods.addReport = function(data){
    // First add the data to the this environment
    
    this.reports.push({
        timings : data.data,
        ie : data.bowser.ie || false,
        chrome: data.bowser.chrome || false,
        phantom: data.bowser.phantom || false,
        safari: data.bowser.safari || false,
        iphone : data.bowser.iphone || false,
        ipad : data.bowser.ipad || false,
        touchpad : data.bowser.touchpad || false,
        android : data.bowser.android || false,
        opera : data.bowser.opera || false,
        firefox : data.bowser.firefox || false,
        gecko : data.bowser.gecko || false,
        seamonkey : data.bowser.seamonkey || false,
        version : data.bowser.version || false
    });

    this.save(function(err, env){
        console.log(err);
    }); 

}

module.exports = Environment;