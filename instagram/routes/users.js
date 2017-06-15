var express = require('express');
var models = require('../models/index');
var multer = require('multer');
var sharp = require('sharp');
var models = require('../models/index');
var uploadHandler = multer();
var User = models.user;
var router = express.Router();

router.get('/', function(req, res) {
    res.render('users')
});
module.exports = router;
router.get('/:username', function(req, res) {
    User.findOne({
        where: {
            username: req.params.username
        }
    }).then(function(users) {
        res.render('userprofile', {
            user: users
        });
    });
});

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
// post router for user/:userprofile
router.post('/:username',upload.single('image'),function(req,res){
    User.findOne({
        where:{
            username: req.params.username
        }
    }).then(function(user){
        user.update({
            bio: req.body.bio
        }).then(function(user){
            sharp(req.file.buffer)
            .resize(100,80)
            .max()
            .withoutEnlargement()
            .toBuffer()
            .then(function(thumbnail){
                console.log("came here too")
                s3.upload({
                    Bucket: 'instaclone-june-2017',
                    Key: `pics/${user.id}`,
                    Body: req.file.buffer,
                    ACL: 'public-read',
                    ContentType: req.file.mimetype
                },function(error,data){
                    console.log(error);
                    res.redirect(user.url);
                });
            })
        }).catch(function(error){
            console.log(error)
            res.render('userprofile'); 
        })
    })
});