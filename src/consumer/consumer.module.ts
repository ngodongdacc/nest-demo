import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageHandler } from './messageHandler';
import * as AWS from 'aws-sdk';
import { config } from './config';

AWS.config.update({
  region: config.region,
  accessKeyId: config.aws_access_key_id,
  secretAccessKey: config.aws_access_key_id,
});
@Module({
  imports: [
    // SqsModule.register({
    //   consumers: [
    //     {
    //       name: config.bucket, // name of the queue
    //       queueUrl: config.QueueUrl, // the url of the queue
    //       region: config.region,
    //     },
    //   ],
    //   producers: [],
    // }),
  ],
  controllers: [],
  providers: [MessageHandler],
})
export class ConsumerModule {}
