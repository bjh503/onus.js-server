var io = require('socket.io').listen(1337);

// Mongoose buffers all the commands until it's connected to the database. This means that you don't have to wait until it connects to MongoDB in order to define models, run queries, etc.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/onus');

// Get my models
var Environment = require('./schemata/environment');
var Person = require('./schemata/person');
var Project = require('./schemata/project');
var PRT = require('./schemata/prt');
var Report = require('./schemata/report');

io.sockets.on('connection', function (socket) {

    socket.on('renuntio', function (data){

        // Check the data
        if(data.id == null){
            // Record the data
            var report = new Report({
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

            console.log('Report recieved - storing ' + data.data.length + ' records now...');

            report.save(function(err, report, numberAffected){

                if(err) // Do something
                    console.log(err);

                console.log(report._id);
                // Send the id back to the client so we can add any later timings to this report
                socket.emit('partum', report._id);
            });
        } else{

            console.log('Report recieved - adding ' + data.data.length + ' to existing report...');

            // Find the existing report and add to it
            Report.findOne({ _id: data.id }, 'timings', function(err, report){

                if (err) return handleError(err);

                report.timings = report.timings.concat(data.data);

                report.save(function(err, report, numberAffected){
                    // nothing to do here really
                });
            });
        }
        
    });
});
