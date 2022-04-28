import { Repository, EntityRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UserSchema } from './shema/user.schema';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async register(
        userRegister: UserSchema,
    ): Promise<User> {
        const { name, username, password } = userRegister;
        const user = new User;
        user.name = name;
        user.username = username;
        user.password = await bcrypt.hash(password, 10, function(err, hash) {
            if(err) throw err;
            return hash;
        });;
        await user.save();
        return user;
    }

}