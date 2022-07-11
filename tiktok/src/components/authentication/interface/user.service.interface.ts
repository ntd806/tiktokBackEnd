import { CreateUserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';

export interface UserServiceInterface {
    getByIp(ip: any) : Promise<User>;

    getById(id: any): Promise<User>;

    create(user: CreateUserDto);
}
