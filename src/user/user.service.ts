import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { UserSchema } from './shema/user.schema';
import { User } from './user.entity';
import { UserInter } from './user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        ) {}
    
    private readonly users: UserInter[] = [];

    public async registerUser(
        user: UserSchema
    ): Promise<User> {
        return await this.userRepository.register(user);
    }

    findAll(): UserInter[] {
        return this.users;
        // return await this.userRepository.register(user);
    }
}
