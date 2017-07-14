var express = require('express');
var models = require('../models/index');
var multer = require('multer');
var sharp = require('sharp');
var aws = require('aws-sdk');
var models = require('../models/index');
var User = models.user;
var Post = models.post;
var Comment = models.comment;
var uploadHandler= multer();
var s3 = new aws.S3({region:'us-east-1'})
var router = express.Router();

//In the post table find all the post and the user they belong to
router.get('/', function(req, res) {
    Post.findAll({
		include: [User, Comment]
	}).then(function(posts) {
        console.log(posts);
		res.render('users', {
			posts: posts
		});
    });
});
//first find the user making the request for the new post and then create the post based on that user
//so that the post actually belongs to the current user making the post
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

router.post('/comment',function(req,res){

    Post.findById(req.body.postId).then(function(post){
         post.createComment({
            comments: req.body.comment
        }).then(function(comment){
            res.redirect('/users')
        });
    })   
});
router.get('/:username', function(req, res) {
        User.findWithUsername(req.user.username).then(function(user){
           res.render('userprofile',{
                user: user,
                posts:{}
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