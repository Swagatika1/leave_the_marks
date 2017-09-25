
exports.index=function(req,res){
  res.render('index', {session:req.session});
}

exports.register=function(req, res){
  res.render('register');
}


exports.login=function(req,res){
  res.render('login');
}


exports.newStory=function(req,res){
  if(req.session.loggedIn !== true){
    console.log("Logged In :"+req.session.loggedIn);
    res.redirect('/login');
  }
  else{
    res.render('new-story',{session:req.session});
  }
}
exports.logout = function(req,res){
  console.log("Logging out :"+req.session.username);
  var loggedOutUser = req.session.username;
  req.session.destroy();
  res.render('logout',{loggedOutUser:loggedOutUser});
}
