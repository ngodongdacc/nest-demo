import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSchema } from './shema/user.schema';
import { User } from './user.entity';
import { UserInter } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  public async registerHandler(@Body() user: UserSchema): Promise<User> {
    return await this.userService.registerUser(user);
  }
}
