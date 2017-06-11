var express = require('express');
var passport = require('passport');
var local    = require('passport-local');
var bcrypt = require('bcrypt');
var models = require('../models/index');
var User = models.user;
var router = express.Router();


/* create the middleware strategy for the passport*/
passport.use(
	new local.Strategy(
		function(username, password, done) {
	    User.findOne({
				where: {
					username: username
				}
			}).then(function(user) {
        console.log(user)
	      if (!user)
	        return(done(null, false, {message: 'A user with that email does not exist.'}));
	      else {
					bcrypt.compare(password, user.password, function(error, result) {
						if (result)
				      return(done(null, user));
						else
			        return(done(null, false, {message: 'Incorrect password.'}));
        	});
				}
	    });
	  }
	)
);
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    done(null, user);
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      user:{}
  });
});
router.post('/',function(req,res){
  bcrypt.hash(req.body.password, 10, function(error,password){
    User.create({
        username: req.body.username,
        phonenumber: req.body.phonenumber,
        password: password,
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

/* Get to the sign in page*/
router.get('/signin',function(req, res, next){
  res.render('signin');
});
/* problems right here with the passport.authenticate, it kept returning bad request */
router.post('/signin', passport.authenticate('local'), function(req,res) {
  res.redirect('/users');
});
module.exports = router;
