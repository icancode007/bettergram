var express = require('express');
var models = require('../models/index');
var multer = require('multer');
var sharp = require('sharp');
var aws = require('aws-sdk');
var models = require('../models/index');
var uploadHandler= multer();
var User = models.user;
var cloudinary = require('cloudinary');
var s3 = new aws.S3({region:'us-east-1'})
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

router.post('/:username', uploadHandler.single('image'), function(req, res) {
    User.findOne({
        where: {
            username: req.params.username
        }
    }).then(function(user) {
        user.update({
            bio: req.body.bio
        }).then(function() {
            sharp(req.file.buffer)
                .resize(280,250)
                .max()
                .withoutEnlargement()
                .toBuffer()
                .then(function(thumbnail) {
                    console.log(`users/${user.id}`);
                    s3.upload({
                        Bucket: 'instaclone-june-2017',
                        Key: `users/${user.id}`,
                        Body: req.file.buffer,
                        ACL: 'public-read',
                        ContentType: req.file.mimetype
                    }, function(error, data) {
                        console.log("location: " + data.Location);
                        user.update({
                            imageurl: data.Location
                        }).then(function () {
                             s3.upload({
                             Bucket: 'instaclone-june-2017',
                             Key:  `users/${user.id}-thumbnail`,
                             Body: thumbnail,
                             ACL: 'public-read',
                             ContentType: req.file.mimetype
                         }, function(error, data) {
                            res.redirect(`/users/${user.username}`)
                         });                      
                        })
                    });
                });
        });
    }).catch(function(error) {
        res.redirect('userprofile', {
            user: req.body,
            errors: error.errors
        });
    });
});
