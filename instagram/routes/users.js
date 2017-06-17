var express = require('express');
var models = require('../models/index');
var multer = require('multer');
var sharp = require('sharp');
var aws = require('aws-sdk');
var models = require('../models/index');
var User = models.user;
var Post = models.post;
var uploadHandler= multer();
var cloudinary = require('cloudinary');
var s3 = new aws.S3({region:'us-east-1'})
var router = express.Router();

router.get('/', function(req, res) {
    Post.findAll({
		include: User
	}).then(function(posts) {
		res.render('users', {
			posts: posts
		});
});
    //  User.findWithUsername(req.user.username).then(function(user){

    //     }).then(function(user){
    //         User.findAll().then(function(users){
    //             res.render('users',{
    //                 users: users,
    //                 user: user,
    //                 post:{}
    //             });
    //         })
    //     })
})
//     User.findWithUsername(req.user.username).then(function(user){
//            res.render('users',{
//                 user: user,
//                 post:{}
//          });
//     });
     
// });

router.post('/',uploadHandler.single('image'),function(req,res){
      User.findWithUsername(req.user.username).then(function(user){
         user.createPost({
            post:req.body.post
        }).then(function(post){
            sharp(req.file.buffer)
            .resize(300,300)
            .max()
            .withoutEnlargement()
            .toBuffer()
            .then(function(thumbnail){
                s3.upload({
                    Bucket: 'instaclone-june-2017',
                    Key:    `posts/${post.id}`,
                    Body:    req.file.buffer,
                    ACL:     'public-read',
                    ContenType: req.file.mimetype
                },function(error, data) {
                    s3.upload({
                        Bucket:     'instaclone-june-2017',
                        Key:        `posts/${post.id}-thumbnail`,
                        Body:        thumbnail,
                        ACL:        'public-read',
                        ContentType: req.file.mimetype
                    }, function(error, data) {
                        console.log("ERROR: "+ error)
                        res.redirect('/users');
                    });
                });    
            })
        }).catch(function(error) {
            res.render('users', {
                user: user,
                posts:req.body,
                errors: error.errors
                }).then(function(user,posts){
                    console.log(user,posts);
                })
        });
    });  
});

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
module.exports = router;