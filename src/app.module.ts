import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    ProductModule,
    UserModule,
    TypeOrmModule,
    // .forRoot({
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'Dong1234567890!',
      // database: 'test_db',
      // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      // synchronize: true,
    // }),
    AuthModule,
  ],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
