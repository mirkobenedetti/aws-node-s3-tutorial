var AWS = require('aws-sdk');
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
		
		let params = {
			Bucket: bucketName,
			Key: fileName.trim()
		}
		
		s3.deleteObject(params, function(err, data) {
			
			if (err) {
				console.log(err, err.stack);
			} else {
				console.log("The following file has been deleted:", fileName);	
			}
			
			process.exit();
		});
	});
});

