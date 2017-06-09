var express = require('express');
var models = require('../models/index');
var User = models.user;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Instagram' });
});

router.post('/',function(req,res,next){
  User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
  }).then(function(user){
    res.redirect('/users')
  });
})
module.exports = router;
