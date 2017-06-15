var express = require('express');
var models = require('../models/index');
var multer = require('multer');
var sharp = require('sharp');
var models = require('../models/index');
var User = models.user;
var uploadHandler = multer();

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

