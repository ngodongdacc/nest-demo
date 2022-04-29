import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository : UserRepository,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ username });
        if(user && user.password) {
            const checkPass = await bcrypt.compareSync(password, user.password);
            if(checkPass){
                delete user.password;
                return user;
            }
        }
        return null;
    }

    async login(user: any) {
        const payload = { 
            id: user.id,
            name: user.name,
            username: user.username,
        };
        return {
            ...payload,
            access_token: this.jwtService.sign(payload),
        };
      }
}
