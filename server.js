var io = require('socket.io').listen(1337);
var url = require('url');

// Mongoose buffers all the commands until it's connected to the database. This means that you don't have to wait until it connects to MongoDB in order to define models, run queries, etc.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/onus');

// Get my models
var Environment = mongoose.model('Environment', require('./schemata/environment'));
var Report = mongoose.model('Report', require('./schemata/report'));

io.sockets.on('connection', function (socket) {

    socket.on('renuntio', function (data){

        // Check the data
        if(data.id == null){

            // First check the environments
            Environment.findOne({ url: url.parse(data.url).hostname}, function(err, env){
                if(env == null){
                    // Create a new one
                    var Env = new Environment({
                        name: url.parse(data.url).hostname + ' (created by system)',
                        url: url.parse(data.url).hostname,
                        reports: [],
                        project: null
                    });

                    Env.save(function(err, environment){

                        if(err) console.log(err)

                        else{
                            environment.addReport(data);
                        }
                    });
                }else{

                    console.log('Report recieved - storing ' + data.data.length + ' records now...');

                    console.log(env);

                    env.addReport(data);

                }
            });

        } else{

            console.log('Report recieved - adding ' + data.data.length + ' to existing report...');

            // Find the existing report and add to it
           /* Report.findOne({ _id: data.id }, 'timings', function(err, report){

                if (err) return handleError(err);

                report.timings = report.timings.concat(data.data);

                report.save(function(err, report, numberAffected){
                    // nothing to do here really
                });
            });*/
        }
        
    });
});
