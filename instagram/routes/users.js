var express = require('express');
var multer = require('multer');
var sharp = require('sharp');
var aws = require('aws-sdk');
var models = require('../models/index');
var User = models.user;
var uploadHandler = multer();
var s3            = new aws.S3({region:'us-east-1'});
var router = express.Router();

router.get('/',function(req,res){
    res.render('users')
});
module.exports = router;
router.get('/:username',function(req,res){
  User.findOne({
    where:{
      username: req.params.username
    }
  }).then(function(users){
    res.render('userprofile',{
      user: users
    });
  });
});
router.post('/:username',uploadHandler.single('image'),function(req,res){
    User.update(
      {
        bio:req.body.bio
      },
        {
          where:{
          username: req.params.username
        }
      }
    ).then(function(user){
        sharp(req.file.buffer)
        .resize(280,250)
        .max()
        .withoutEnlargement()
        .toBuffer()
        .then(function(thumbnail){
          s3.upload({
            Bucket: 'instaclone-june-2017',
            Key: `users/${user.id}`,
            Body: req.file.buffer,
            ACL:  'public-read',
            ContentType: req.file.mimetype
          }, function(error, data){
              console.log(data);
              console.log("error1 is: " + error)
          s3.upload({
            Bucket: 'instaclone-june-2017',
            Key:  `users/${user.id}-thumbnail`,
            Body: thumbnail,
            ACL: 'public-read',
            ContentType: req.file.mimetype
          }, function(error, data) {
              res.redirect(user.url)
          });
        });
      });
    }).catch(function (error) {
      res.render('userprofile', {
        user: req.body,
        errors: error.errors
      });
    });
  });
