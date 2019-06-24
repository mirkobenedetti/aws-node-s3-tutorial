var AWS = require('aws-sdk');

var fs = require('fs');
var path = require('path');

var standard_input = process.stdin;


standard_input.setEncoding('utf-8');

AWS.config.update({region: 'us-west-2'});
s3 = new AWS.S3({apiVersion: '2006-03-01'});


let askForBucketName = function () {
    return new Promise(function(resolve, reject) {
		
		console.log("Please enter the name of your Bucket:");
		
		standard_input.on('data', function (name) {
			resolve(name.trim());
		});
    });
}


askForBucketName().then(function(bucketName) {
	
	console.log("Please enter the name of your file:");

	standard_input.on('data', function (fileName) {
		
		var key = path.basename(fileName.trim());
		var body = fs.createReadStream(fileName.trim());

		body.on('error', function(err) {
		  console.log('File Error:', err);
		});

	
		var uploadParams = {Bucket: bucketName, Key: key, Body: body};
		
		s3.upload (uploadParams, function (err, data) {
			
		  if (err) {
			console.log("Error:", err);
		  } if (data) {
			console.log("Upload Success:", data.Location);
		  }
		  
		  process.exit();
		  
		});		
		
	});
	
});

