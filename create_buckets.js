var AWS = require('aws-sdk');
var uuid = require('uuid');
var standard_input = process.stdin;


standard_input.setEncoding('utf-8');

AWS.config.update({region: 'us-west-2'});
s3 = new AWS.S3({apiVersion: '2006-03-01'});


console.log("Enter a name for your Bucket:");


standard_input.on('data', function (name) {

	var bucketName = name.trim() + '-' + uuid.v4();


	var bucketParams = {
	  Bucket : bucketName,
	  ACL : 'public-read'
	};


	s3.createBucket(bucketParams, function(err, data) {

	  if (err) {
		console.log("Error:", err);
	  } else {
		console.log("Success:", data.Location);
	  }
	  
	  process.exit();

	});

});