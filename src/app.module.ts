import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ConsumerModule } from './consumer/consumer.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { Product } from './product/product.entity';
import { User } from './user/user.entity';
import { File } from './file/file.entity';

import configuration from './config/configuration';
import configAws from './aws/config';
import { DBModule } from './unit/db.moduler';
// import { DBModule } from './unit/db.moduler';
@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: `${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration, configAws],
    }),
    // TypeOrmModule.forRoot(),
    ProductModule,
    UserModule,
    AuthModule,
    FileModule,
    ConsumerModule,
    DBModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
