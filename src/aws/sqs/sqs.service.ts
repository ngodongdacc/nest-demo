import { Consumer } from 'sqs-consumer';
import { Var_globlal_AWS } from '../const';
import * as AWS from 'aws-sdk';
import { FileRepository } from '../../file/file.repository';
import { ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration';

AWS.config.update({
  region: Var_globlal_AWS.region, // process.env.REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const fileRepository = new FileRepository();

export class SqsService {
  constructor() {}
  start() {
    const sqsService = Consumer.create({
      queueUrl: Var_globlal_AWS.QueueUrl,
      handleMessage: async (message) => {
        if (message && message.Body) {
          const body = JSON.parse(message.Body);
          const Key = body.Records[0].s3.object.key;
          if (Key) {
            await fileRepository.uploadFile({ Key });
          }
        }
      },
      sqs: new AWS.SQS(),
    });
    sqsService.on('error', (err) => {
      console.error(err.message);
    });

    sqsService.on('processing_error', (err) => {
      console.error(err.message);
    });

    sqsService.on('timeout_error', (err) => {
      console.error(err.message);
    });
  }
}
