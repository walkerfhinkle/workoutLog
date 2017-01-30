var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('workoutlog', 'postgres', 'postpass08!!', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);

// build a user model in sqllize
var User = sequelize.define('user', {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING,
});

//creates the table in postgres
User.sync(); 
// User({ force: true });

app.use(bodyParser.json());

app.post('/api/user', function(req, res){
	//when we post to api user, it will want a user object in the body
	var username = req.body.user.username;
	var pass = req.body.user.password;

	//Match the model we create above
	//Sequelize - take the user model and go out to the db and create this:
	User.create({
		username: username,
		passwordhash: ''
}).then(
		//Sequelize is going to return the object it created from db.
		function createSuccess(user){
			//successful get thsi:
			res.json({
				user: user,
				message: 'create'
			});
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
});

app.use(require('./middleware/header'));

app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("app is listening on port 3000");
});