var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("onus.db");

var database = {

	create: function(){
		db.serialize(function() {

			// Clean the existing table
			db.run("DROP TABLE IF EXISTS projects");

			// Create the projects table
			db.run("CREATE TABLE projects (id int NOT NULL PRIMARY KEY,	name varchar(255) NOT NULL)");

			// Now drop the environments table
			db.run("DROP TABLE IF EXISTS environments");

			// Create the environments table
			db.run("CREATE TABLE environments(id int NOT NULL PRIMARY KEY, project_id int NOT NULL,  name varchar(255) NOT NULL, FOREIGN KEY (project_id) REFERENCES projects(id))");

			// Drop the URL table
			db.run("DROP TABLE IF EXISTS urls");

			// Create the URL table
			db.run("CREATE TABLE urls(id int NOT NULL PRIMARY KEY, environment_id int, url text, FOREIGN KEY (environment_id) REFERENCES environments(id))");
		});
	},

	populate : function(){
		db.serialize(function() {

			// Add a project
			db.run("INSERT INTO projects (id, name) values (1, 'benharrop.co.uk')");

			// Add a couple of environments
			db.run("INSERT INTO environments (id, project_id, name) values (1, 1, 'local'), (2, 1, 'production')");

			// Add a couple of urls
			db.run("INSERT INTO urls (id, environment_id, url) values (1, 1, '127.0.0.1'), (2, 2, 'benharrop.co.uk')");

		});
	}
}

var argument = process.argv.splice(2)[0];

switch(argument){

	case 'create':
		database.create();
		break;

	case 'populate':
		database.populate();
		break;

	default:
		console.log('No command specified, shutting down.');
}

db.close();