import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
    constructor(private userRepository : UserRepository){}

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

    async login(username: string, password: string): Promise<any> {
        const user = await this.validateUser(username, password);
        if(!user){
            throw new UnauthorizedException('usernam or password incorrect');
        }
    }
}
