import { Consumer } from 'sqs-consumer';
import { Var_globlal_AWS } from '../const';
import * as AWS from 'aws-sdk';
import { FileRepository } from '../../file/file.repository';

AWS.config.update({
  region: Var_globlal_AWS.region,
  accessKeyId:  'AKIAYNSHB5H4JFEIKGFS',
  secretAccessKey: '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'
})
const fileRepository = new FileRepository();
const tesst = () =>{
  const app = Consumer.create({
    queueUrl: Var_globlal_AWS.QueueUrl,
    handleMessage: async (message) => {
    //  const urlFile = await fileRepository.getUrlFile()
      if(message && message.Body) {
        const body = JSON.parse(message.Body);
        const Key = body.Records[0].s3.object.key;
        if(Key){
          await fileRepository.uploadFile({ Key });
        }
      }
        
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
}

export class SqsConsumer {
  public start(options: {}) {
    return 0;
  };
}

