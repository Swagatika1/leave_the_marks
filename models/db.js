var mongoose = require('mongoose');
var crypto = require('crypto');
var dbURI = 'mongodb://localhost/test1';
mongoose.connect(dbURI);

mongoose.connection.on('conected',function(){
  console.log('Mongoose connected');
});

mongoose.connection.on('error',function(){
  console.log('Mongoose connection error');
});

mongoose.connection.on('disconnected',function(){
  console.log('Mongoose disconnected');
});

var userSchema = new mongoose.Schema({
  username:{type:String,unique:true},
  email:{type:String,unique:true},
  password:String
});
// Generate Salt

function generateSalt() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

// Hash the password and save

userSchema.pre('save',function(next){
  var user = this;
  if (!user.isModified('password')) return next();
  var salt = generateSalt();
  var hashedpassword = crypto.pbkdf2Sync(user.password, salt, 10, 512, 'sha512');
  console.log(user.password);
  console.log(hashedpassword.toString('hex'));
  console.log("salt "+ salt);
  user.password = salt.toString('hex')+'|'+hashedpassword.toString('hex');
  next();

});

// Compare savedpassword with currentpassword

userSchema.methods.comparePassword = function(candidatePassword, cb){
  var user = this;
  console.log("dbpassword = " +user.password);
  var salt = user.password.split("|",1);
  console.log("salt "+salt);
  hashedpassword = crypto.pbkdf2Sync(candidatePassword, salt.toString('hex'), 10, 512, 'sha512');
  console.log("hashedpassword = " + hashedpassword.toString('hex'));
  newpassword = salt +'|'+hashedpassword.toString('hex');
  console.log("newpassword = " +newpassword);
  console.log("dbpassword = " +user.password);
  if (user.password  === newpassword){
    return cb(null,true);

  }
  else{
    return cb(new Error("Invalid password"), false);
  }
}

// Stories Schema

var storiesSchema = new mongoose.Schema({
  author:String,
  title: {type: String,unique:true},
  created_at:{type:Date,default:Date.now},
  summary:String,
  content: {type: String},
  imageLink:String,
  comments:[{body:String,commented_by:String,date:Date}]
  
});



mongoose.model( 'Story', storiesSchema,'stories');




mongoose.model('User',userSchema);
