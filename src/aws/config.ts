export default () => ({
  pathSaveFile: process.env.PATH_SAVE_FILE,
  s3: {
    bucket: process.env.AWS_S3_TIMEZONE_BUCKET,
    region: process.env.AWS_REGION,
    aws_access_key_id: process.env.AWS_S3_TIMEZONE_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_S3_TIMEZONE_SECRET_ACCESS_KEY,
  },
  sqs: {
    bucket: process.env.AWS_S3_TIMEZONE_BUCKET,
    region: process.env.AWS_REGION,
    queueUrl: process.env.AWS_SQS_TIMEZONE_URL,
    aws_access_key_id: process.env.AWS_SQS_TIMEZONE_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SQS_TIMEZONE_SECRET_ACCESS_KEY,
  },
});
