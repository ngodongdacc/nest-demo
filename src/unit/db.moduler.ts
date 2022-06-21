import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: 'root', // process.env.DB_USERNAME,
      password: '12345678', // process.env.DB_PASSWORD,
      database: 'demo', // process.env.DB_NAME,
      // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      entities: [Product, User],
      synchronize: true,  
    }), // add this
  ],
})
export class DBModule {}
