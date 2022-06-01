// Create service client module using ES6 syntax.
import { S3 } from 'aws-sdk';
import { Var_globlal_AWS } from './const';
// Set the AWS Region.
const REGION = Var_globlal_AWS.region; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3 = new S3({ region: REGION });
export { s3 };
