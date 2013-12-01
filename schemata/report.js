var mongoose = require('mongoose');
var PRT = require('./prt');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Report = new Schema({
    timings: [PRT],
    ie : { type: Boolean, default: false},
    chrome: { type: Boolean, default: false},
    phantom: { type: Boolean, default: false},
    safari:{ type:  Boolean, default: false},
    iphone : { type: Boolean, default: false},
    ipad : { type: Boolean, default: false},
    touchpad : { type: Boolean, default: false},
    android : { type: Boolean, default: false},
    opera : { type: Boolean, default: false},
    firefox : { type: Boolean, default: false},
    gecko : { type: Boolean, default: false},
    seamonkey : { type: Boolean, default: false},
    version : String,
});

module.exports = Report;
