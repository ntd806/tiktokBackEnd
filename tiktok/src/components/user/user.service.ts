import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async updateUser(user: User, dto: UserDto) {
        user.sex = dto.sex;
        user.fullname = dto.fullname;
        user.birthdate = dto.birthdate;
        const newUser = await this.userRepository.save(user);
        return newUser;
    }
}
