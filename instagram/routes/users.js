var express = require('express');
var multer = require('multer');
var sharp = require('sharp');
var models = require('../models/index');
var User = models.user;
var uploadHandler = multer();

cloudinary.config({ 
  cloud_name: 'diqhgzinu', 
  api_key: '861668197961751', 
  api_secret: 'LtbjNc1kVDWszRQ9UYYWrBERL0s' 
});


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
              console.log("user :" + user);
                user.update({
                    bio: req.body.bio
                }).then(function(user) {
                    sharp(req.file.buffer)
                        .resize(280, 250)
                        .max()
                        .withoutEnlargement()
                        .toBuffer()
                        .then(function(thumbnail) {
                            
                        });
                    });
                }).catch(function(error) {
                    res.render('userprofile', {
                        user: req.body,
                        errors: error.errors
                    });
                });
            });
