import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../video/dto/pagination.query.dto';

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
        return {
            code: 40002,
            data: newUser,
            message: 'Update successfully'
        };
    }

    public async findAll(paginationQuery: PaginationQueryDto): Promise<any> {
        const { limit, offset } = paginationQuery;

        const users = await this.userModel.find().skip(offset).limit(limit);
        return {
            code: 40009,
            data: users,
            message: `Get list user successfully`
        };
    }
}
