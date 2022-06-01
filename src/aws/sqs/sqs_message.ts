// Load the AWS SDK for Node.js
import * as AWS from 'aws-sdk';
import { Var_globlal_AWS } from '../const';
// Set the region
AWS.config.update({ region: Var_globlal_AWS.region });

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const params = {
  // Remove DelaySeconds parameter and value for FIFO queues
  DelaySeconds: 2,
  MessageAttributes: {
    Title: {
      DataType: 'String',
      StringValue: 'The Whistler',
    },
    Author: {
      DataType: 'String',
      StringValue: 'John Grisham',
    },
    WeeksOn: {
      DataType: 'Number',
      StringValue: '6',
    },
  },
  //   MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
  // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  // MessageGroupId: "Group1",  // Required for FIFO queues
  QueueUrl: Var_globlal_AWS.QueueUrl,
};

export class SQS {
  constructor() {}
  public async sendMessage(messageBody) {
    const paramMessage = {
      ...params,
      MessageBody: messageBody,
    };
    sqs.sendMessage(paramMessage, function (err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data.MessageId);
      }
    });
  }
}
