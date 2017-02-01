
require('dotenv').config();

var sequelize = require('./db.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var User = sequelize.import('./models/user');

//creates the table in postgres
sequelize.sync();
//**THIS WILL CLEAR USER TABLE**//
//	User({ force: true });

app.use(bodyParser.json());

app.use(require('./middleware/header'));
app.use(require('./middleware/validate-session'));

app.use('/api/user', require('./routes/user'));
//login route
app.use('/api/login', require('./routes/session'));
app.use('/api/definition', require('./routes/definition'));

app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("app is listening on port 3000");
});		