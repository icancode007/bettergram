var aws = require('aws-sdk');
var s3 = new aws.S3({region: 'us-east-1'});



s3.upload({
    Bucket: 'instaclone-june-2017',
    Key: 'hello',
    Body: 'testing'
}, function(error, data) {
  console.log(error);
});
