var express = require('express');
var models = require('../models/index');
var multer = require('multer');
var sharp = require('sharp');
var models = require('../models/index');
var upload= multer();
var User = models.user;
var cloudinary = require('cloudinary');
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

router.post('/:username',upload.single('image'),function(req,res){
    User.findOne({
        where:{
            username: req.params.username
        }
    }).then(function(user){
        user.update({
            bio: req.body.bio
        }).then(function(user){
            cloudinary.uploader.upload(req.files.image.path,function(result){
                console.log("here: " + result);
            });
        }).catch(function(error){
            console.log(error)
            res.render('userprofile'); 
        })
    })
});