import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { Consumer } from 'sqs-consumer';
// import { CsvService } from 'src/csv-parse/csv-parse.service';
import { MessageHandler } from './messageHandler';
import { SqsConsumerService } from './sqsConsumer.service';
@Injectable()
export class ConsumerService {
  private sqs: AWS.SQS;
  constructor(
    private messageHandler: MessageHandler,
    private configService: ConfigService,
    // private csv: CsvService,
    private sqsConsumerService: SqsConsumerService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {
    this.sqs = new AWS.SQS({
      region: this.configService.get<string>('sqs.region'),
      accessKeyId: this.configService.get<string>('sqs.aws_access_key_id'),
      secretAccessKey: this.configService.get<string>(`
      sqs.aws_secret_access_key`),
    });
  }
  messageError;
  async start() {
    console.log('sqs running ...');
    const queueUrl = this.configService.get<string>('sqs.queueUrl');
    const sqsService = Consumer.create({
      queueUrl,
      handleMessage: async (message) => {
        this.messageError = message;
        const fileName = await this.messageHandler.handleMessage(message);
        // const jsonData = await this.csv.parseToJson(fileName);
        // await this.messageHandler.createTransaction(jsonData, false, fileName);
      },
      shouldDeleteMessages: true,
      // handleMessageBatch: ,
      stopped: false,
      sqs: this.sqs,
    });
    sqsService
      .on('error', async (error) => {
        this.logger.error(' error_sqsService ', error.message);
        await this.sqsConsumerService.deleteMessageBatch([this.messageError]);
        console.error('error::', error.message);
      })
      .on('processing_error', async (error) => {
        this.logger.error(' processing_error ', error.message);
        await this.sqsConsumerService.deleteMessageBatch([this.messageError]);
      })
      .on('timeout_error', async (error) => {
        this.logger.error(' timeout_error ', error.message);
        await this.sqsConsumerService.deleteMessageBatch([this.messageError]);
      })
      .start();
  }
}
