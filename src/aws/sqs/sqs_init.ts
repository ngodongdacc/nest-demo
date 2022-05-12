import { Consumer } from 'sqs-consumer';
import * as AWS from 'aws-sdk';
import { Var_globlal_AWS } from '../const';

AWS.config.update({
    region: Var_globlal_AWS.region,
    accessKeyId: 'AKIAYNSHB5H4JFEIKGFS',
    secretAccessKey: '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'
  });
  
  const app = Consumer.create({
    queueUrl: Var_globlal_AWS.QueueUrl,
    handleMessage: async (message) => {
        console.log('ok:: ', message);
        
      // ...
    },
    sqs: new AWS.SQS()
  });

  app.on('error', (err) => {
    console.error(err.message);
  });
  
  app.on('processing_error', (err) => {
    console.error(err.message);
  });
  
  app.on('timeout_error', (err) => {
   console.error(err.message);
  });
  
  app.start();
