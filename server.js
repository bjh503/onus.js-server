var express = require('express');
var sqlite3 = require("sqlite3").verbose();
var app = express();

app.use(express.bodyParser());
app.use(express.logger());

app.get('/', function(req, res){

	res.end('Onus Server');
});

/**
 * This is the actual URL that onus will post the data off too
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
app.post('/', function(req, res){

	// First work out what environment and project we are on
	var db = new sqlite3.Database("onus.db");

	db.all("SELECT * from urls where url = $url", { $url : req.host }, function(err, rows){

		if(err != null){
			console.log(err);
			process.exit(1);
		} 

		// Next count the rows, if there are more than one then we cannot decide which env it is
		if(rows.length > 1){
			console.log("URL is not specific to a single environment, stopping");
		} else{
			console.log("URL found, id "+rows[0].id);
		}
	

	});
	// Needed for chrome to not be a little baby
	res.set({
		'Access-Control-Allow-Origin': 'http://127.0.0.1:2368',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	});

	// Be nice
	res.end('Done, thanks!');
});

/**
 * This is to with the CORS standard preflight rules
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
app.options('/', function(req, res){

	res.set({
		'Access-Control-Allow-Origin': 'http://127.0.0.1:2368',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	});

	res.end('Done, thanks!');
});

app.listen(1337);