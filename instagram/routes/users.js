var express = require('express');
// var multer = require('multer');
// var sharp = require('sharp');
// var aws = require('aws-sdk');
var models = require('../models/index');
var User = models.user;
var router = express.Router();
router.get('/',function(req,res){
    res.render('users')
});
module.exports = router;
