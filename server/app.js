
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var sequelize = require('./db.js');
var User = sequelize.import('./models/user');

//creates the table in postgres
User.sync();
//**THIS WILL CLEAR USER TABLE**//
//	User({ force: true });

app.use(bodyParser.json());
app.use(require('./middleware/header'));
app.use('/api/user', require('./routes/user'));
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("app is listening on port 3000");
});