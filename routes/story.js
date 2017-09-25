var mongoose = require('mongoose');
var Story = mongoose.model('Story');

exports.addStory = function(req,res)
{
  var title = req.body.title;
  console.log("title is " +title);
  var content = req.body.content;
  var summary = req.body.summary;
  var imageLink = req.body.imageLink;
  var author = req.session.username;

  var newStory = new Story();
  newStory.title = title;
  newStory.content = content;
  newStory.summary = summary;
  newStory.imageLink = imageLink;
  newStory.author= author;

  newStory.save(function(err,savedStory){
    if(err)
      {
        console.log(err);
        console.log("Error : While saving the story");
        return res.status(500).send();
      }
    else {
      res.redirect("/stories");
    }
  });
}

exports.stories = function(req,res){
  Story.find({}, function(err, stories){
    res.render('home',{stories,session:req.session});
  });
}



/*exports.getStory=function(req,res){
   var author=req.session.username;
   Story.findOne({author:author}, function(err,story){
           res.render('story',{story:story,session:req.session});
        });
*/
