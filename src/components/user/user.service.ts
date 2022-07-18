import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {}

    async updateUser(user: User, dto: UserDto) {
        await user.update(dto);
        await user.save();
        const newUser = await this.userModel.find({ _id: user.id });
        return newUser;
    }
}
