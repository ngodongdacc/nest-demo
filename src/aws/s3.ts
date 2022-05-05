var AWS = require('aws-sdk');

// Set the region 
AWS.config.update({region: 'us-west-2'});

// Create S3 service object
export const s3 = new AWS.S3({apiVersion: '2006-03-01'});
