var AWS = require('aws-sdk');
var standard_input = process.stdin;


standard_input.setEncoding('utf-8');

AWS.config.update({region: 'us-west-2'});
s3 = new AWS.S3({apiVersion: '2006-03-01'});


console.log("Please enter the name of the Bucket to delete:");


standard_input.on('data', function (name) {
	
	var bucketParams = {
	  Bucket : name.trim()
	};


	let returnObjects = function() {
		return new Promise(function(resolve, reject) {
			s3.listObjects(bucketParams, function(err, objects) {
				if (err) {
					console.log("Error:", err);
				} else {
					resolve(objects);
				}
			});
		});
	}


	let emptyBucket = function(objects) {
		return new Promise(function(resolve, reject) {			
			objects.Contents.forEach(function(content) {
				
				let delBuckParams = {
					Bucket: name.trim(),
					Key: content.Key
				}
				
				s3.deleteObject(delBuckParams, function(err, data) {
					if (err) console.log(err, err.stack);
				});
			});
		
			resolve("done");
		
		});
	}


	returnObjects()
	.then(function(objects) {emptyBucket(objects)})
	.then(function() {
		s3.deleteBucket(bucketParams, function(err, data) {

		  if (err) {
			console.log("Error:", err);
		  } else {
			console.log("The following Bucket has been deleted:", name.trim());
		  }
		  
		  process.exit();

		});
	});

});