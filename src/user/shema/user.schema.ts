import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class UserSchema {
  @IsString()
  @MinLength(6, {
    message: 'username is too short, min 6 char',
  })
  @MaxLength(255, {
    message: 'username is too long, max 255 char',
  })
  username: string;
  
  @MaxLength(255, {
    message: 'name is too long, max 255 char',
  })
  @IsString()
  name: string;

  @IsString()
  @MinLength(6, {
    message: 'password is too short, min 6 char',
  })
  @Matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
  password: string;
}