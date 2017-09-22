var express = require('express');
var chalk = require('chalk');
var mangoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes=require('./routes/routes.js');
var user=require('./routes/user.js');
//var db=require('./models/db.js');


var app = express();
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({secret:"qazwsxedcrfvtgbyhnujm",resave: true, saveUninitialized: true}));

app.get('/', routes.index);
app.get('/register', routes.register);
app.post('/newUser',user.doCreate);
app.post('/authenticate',user.authenticate);
//app.get('/registrationSuccessful',user.regisrationSuccessful);
app.get('/login',routes.login);






var port = process.env.port || 8080;
var server = app.listen(port,function(req,res){
  console.log("Server started");
});
