import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SQS from 'aws-sdk/clients/sqs';
import { SQSMessage } from 'sqs-consumer';

@Injectable()
export class SqsConsumerService {
  sqs: SQS;
  queueUrl: string;
  constructor(private readonly configService: ConfigService) {
    this.sqs = new SQS({
      region: this.configService.get<string>('sqs.region'),
      accessKeyId: this.configService.get<string>('sqs.aws_access_key_id'),
      secretAccessKey: this.configService.get<string>(
        'sqs.aws_secret_access_key',
      ),
    });
    this.queueUrl = this.configService.get<string>('sqs.queueUrl');
  }

  async deleteMessageBatch(messages: SQSMessage[]): Promise<void> {
    const deleteParams = {
      QueueUrl: this.queueUrl,
      Entries: messages.map((message) => ({
        Id: message && message.MessageId,
        ReceiptHandle: message.ReceiptHandle,
      })),
    };

    try {
      await this.sqs.deleteMessageBatch(deleteParams).promise();
    } catch (err) {
      console.log('deleteMessageBatch:: ', err);
      throw err;
    }
  }
}
