import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { s3Client } from './aws/s3Client';
import { S3Service } from './aws/s3/s3.service';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('message')
  sendMessage(@Request() req) {
    // const s3 = new S3Service();
    // sqs.sendMessage('Hello word');
    return 'ok';
  }
  @Post('test')
  test(@Request() req) {
    console.log('req:: ', req.body);
    return {
      data: [],
    };
  }

  // @Get('/files')
  // public async getListFile() {
  //   const params = {
  //     // Body: "hello kiss",
  //     Bucket: "dongngo-test",
  //     // Key: "hello.txt"
  //     MaxKeys: 1,
  //   };
  //   let data = {}
  //   data = await s3.listObjects(params).promise();
  //   return data;
  // }
}
