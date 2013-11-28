var mongoose = require('mongoose');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var PerformanceResourceTiming = new Schema({
    connectEnd: Number,
    connectStart: Number,
    domainLookupEnd: Number,
    domainLookupStart: Number,
    duration: Number,
    fetchStart: Number,
    initiatorType: { type: String, enum: ['link', 'script', 'img', 'css', '', 'xmlhttprequest']},
    name: String,
    redirectEnd: Number,
    redirectStart: Number,
    requestStart: Number,
    responseEnd: Number,
    responseStart: Number,
    secureConnectionStart: Number,
    startTime: Number,
});

module.exports = PerformanceResourceTiming;