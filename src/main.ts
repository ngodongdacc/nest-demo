import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { cpus } from 'os';
import { AppModule } from './app.module';
import './aws/sqs/sqs_init';

async function bootstrap() {
  // console.log('cpus:: ', cpus().length);
  // console.log('cpus thead:: ', cpus());
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
