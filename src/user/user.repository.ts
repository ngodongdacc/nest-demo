import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { User } from './user.entity';
import { UserSchema } from './shema/user.schema';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async register(
        userRegister: UserSchema,
    ): Promise<User> {
        const { name, username, password } = userRegister;
        const findUsername = await this.findOne({username});
        if(findUsername){
            throw new BadRequestException(`username ${username} already exist`);
        }
        const user = new User;
        user.name = name;
        user.username = username;
        user.password = bcrypt.hashSync(password, 10);
        if(!findUsername){
            await user.save();
        }
        return user;
    }

}