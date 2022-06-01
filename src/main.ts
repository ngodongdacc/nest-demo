import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
// import { sqsService } from './aws/sqs/sqs.service';
// import { sqsService } from './aws/sqs/sqs.service';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const sqsService =  SqsService;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
