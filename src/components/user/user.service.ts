import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto, UpdateUserDto, AvataDto } from './dto';
import { User } from './model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../video/dto/pagination.query.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private readonly jwt: JwtService,
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

    public async updatePhoneNumber(user: User, dto: UpdateUserDto) {
        try {
            const checkUser = await this.userModel.find({ _id: user.id });
            if (checkUser.length < 1) {
                return {
                    code: 40012,
                    data: [],
                    message: 'Not found user'
                };
            }

            const checkPhone = await this.userModel.find({ phone: dto.phone });
            if (checkPhone.length >= 1) {
                return {
                    code: 40015,
                    data: [],
                    message: 'Phone number has taken'
                };
            }

            await user.update(dto);
            await user.save();
            const newUser = await this.userModel.find({ _id: user.id });
            const access_token = await this.signToken(dto.phone);
            return {
                code: 40011,
                data: {
                    newUser,
                    access_token
                },
                message: 'Update phone number successfully'
            };
        } catch (error) {
            console.log(error);
            throw new NotFoundException(error);
        }
    }

    public async updateAvata(user: User, dto: AvataDto) {
        try {
            const checkUser = await this.userModel.find({ _id: user.id });
            if (checkUser.length < 1) {
                return {
                    code: 40012,
                    data: [],
                    message: 'Not found user'
                };
            }

            await user.update(dto);
            await user.save();
            const newUser = await this.userModel.find({ _id: user.id });
            return {
                code: 40013,
                data: newUser,
                message: 'Update avata number successfully'
            };
        } catch (error) {
            console.log(error);
            throw new NotFoundException(error);
        }
    }

    async signToken(phone: string): Promise<{ access_token: string }> {
        const payload = {
            sub: phone
        };
        const secret = process.env.SECRET;

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '365d',
            secret: secret
        });

        return {
            access_token: token
        };
    }
}
