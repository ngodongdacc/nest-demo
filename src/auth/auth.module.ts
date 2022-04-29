import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/user.repository';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule, PassportModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
