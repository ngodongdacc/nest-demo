import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAM,
      password: process.env.DB_USERNAME,
      database: process.env.DB_PASSWORD,
      // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      entities: [Product, User],
      synchronize: true,
    }), // add this
  ],
})
export class DBModule {}
