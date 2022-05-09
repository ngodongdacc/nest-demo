// Create service client module using ES6 syntax.
import { S3Client } from '@aws-sdk/client-s3';
import { Var_globlal_AWS } from './const';
// Set the AWS Region.
const REGION = Var_globlal_AWS.region; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const S3 = new S3Client({ region: REGION, apiVersion: '2006-03-01' });
export { S3 };