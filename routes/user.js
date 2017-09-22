var mongoose = require('mongoose');
var db=require('../models/db.js');
var User = mongoose.model('User');



exports.doCreate=function(req,res){
  var username=req.body.username;
  var email=req.body.email;
  var password=req.body.password;

  var newuser=new User();
  newuser.username=username;
  newuser.email=email;
  newuser.password=password;

  newuser.save(function(err,savedUser){
    if(err){
      console.log('User is already exists');
      console.log(err);
      var message ="A user alraedy exists with that username or email";
      res.render("register,{errorMessage:message}");
      return;
    }else{
      console.log('Swagatika');
      console.log(savedUser.username);
      req.session.newuser = savedUser.username;
      res.render('new-user',{session:req.session});
    }
  });
}




exports.authenticate=function(req,res){
  var email=req.body.email;
  var password=req.body.password;
  console.log("Email = " + email);
  User.findOne({email:email}, function(err,user){
    console.log(err);
    console.log(user);
    console.log(user.email);
    console.log(user.password);

    //if(password === user.password){
    user.comparePassword(password, function(err, equal){
      if(err == null){
        res.render("login");
        console.log("Login Passed");
      }
      else{
        res.render("register");
        console.log("Login Failed");
      }
    });
  });
}
