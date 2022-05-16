import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { cpus } from 'os';
import { AppModule } from './app.module';

async function bootstrap() {
  // console.log('cpus:: ', cpus().length);
  // console.log('cpus thead:: ', cpus());
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
