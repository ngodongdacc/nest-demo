import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
// import { sqsService } from './aws/sqs/sqs.service';
// import { sqsService } from './aws/sqs/sqs.service';
import { AppModule } from './app.module';
console.log('process 1:: ', process.env.API_PORT);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const sqsService =  SqsService;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
