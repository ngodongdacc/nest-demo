import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { config } from './config';
import * as https from 'https';
import * as fs from 'fs';

@Injectable()
export class MessageHandler {
  constructor() {}
  @SqsMessageHandler(config.bucket, false)
  async handleMessage(message: AWS.SQS.Message) {
    const obj: any = JSON.parse(message.Body) as {
      message: string;
      date: string;
    };
    const { data } = JSON.parse(obj.Message);
    console.log('data:: ', data);
    // use the data and consume it the way you want //
  }

  async dowloadFile(param: { Key: string }) {
    const file = fs.createWriteStream('file.jpg');
    const request = https.get(
      'http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg',
      function (response) {
        response.pipe(file);

        // after download completed close filestream
        file.on('finish', () => {
          file.close();
          console.log('Download Completed');
        });
      },
    );
  }
}
