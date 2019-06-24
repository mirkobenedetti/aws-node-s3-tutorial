var AWS = require('aws-sdk');


AWS.config.update({region: 'us-west-2'});
s3 = new AWS.S3({apiVersion: '2006-03-01'});


s3.listBuckets(function(err, buck) {
	
  if (err) {
	  
    console.log("Error:", err);
	
  } else {
	  
	  if (buck.Buckets.length > 0) {
		
		buck.Buckets.forEach(function(bucket) {
			
			console.log("Here are your Buckets:", bucket);
			
			var bucketParams = {
			  Bucket : bucket.Name,
			};


			s3.listObjects(bucketParams, function(err, objects) {
			  if (err) {
				console.log("Error:", err);
			  } else {
				console.log("Objects:", objects);
			  }
			});		
		});		
		
	  } else {
		console.log("You have no Buckets yet.");
	  }
	  
  }
  
});