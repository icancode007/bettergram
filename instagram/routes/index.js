var express = require('express');
var passport = require('passport');
var local = require('passport-local');
var bcrypt = require('bcrypt');
var models = require('../models/index');
var User = models.user;
var router = express.Router();

/* GET home page. */
passport.use(
  new local.Strategy(
  function(email,password,done){
    User.findOne({
      where:  {
        email: email
      }
    }).then(function(user){
      if(!user)
        return(done(null,false,{msg: 'No users whre found under that address, try again'}));
      else{
        bcrypt.compare(password, user.password, function(error,result){
          if(result)
            return(done(null, user));
          else
            return(done(null, false,{message: 'Incorrect password, try again'}));
        });
      }
    });
  }
))
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    done(null, user);
  });
});
router.get('/', function(req, res, next) {
  res.render('index', {
      user:{}
  });
});

router.post('/',function(req,res){
  bcrypt.hash(req.body.password,10, function(error,password){
    User.create({
        username: req.body.username,
        phonenumber: req.body.phonenumber,
        password: req.body.password,
        email: req.body.email
    }).then(function(user){
        req.login(user, function(error) {
        res.redirect('/users')
      });
    }).catch(function(error){
      res.render('index',{
          user: req.body,
          errors: error.errors
      });
    });
  });
});
module.exports = router;
