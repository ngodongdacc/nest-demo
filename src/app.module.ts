import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqsModule, SqsConfig } from '@nestjs-packages/sqs';

import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ConsumerModule } from './consumer/consumer.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { FileService } from './file/file.service';

import { Product } from './product/product.entity';
import { User } from './user/user.entity';
import { File } from './file/file.entity';

import { FileController } from './file/file.controller';
import configuration from './config/configuration';
// import { config } from './config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Dong1234567890!',
      database: 'test_db',
      // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      entities: [Product, User, File],
      synchronize: true,
    }),
    ProductModule,
    UserModule,
    AuthModule,
    FileModule,
    ConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
