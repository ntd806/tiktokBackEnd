import { Injectable } from '@nestjs/common';
import { UserDto, UpdateUserDto, AvataDto } from './dto';
import { User } from './model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../video/dto/pagination.query.dto';
import { JwtService } from '../../common';
import { STATUSCODE } from '../../constants';
import { BaseErrorResponse, BaseResponse } from '../../common';
import { UserDto as UserCreateDto } from '../../models';

@Injectable()
export class UserService {
    constructor(
        private readonly jwt: JwtService,
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) { }

    async findUserById(id: string) {
        return await this.userModel.findById(id);
    }

    async findByEmail(email: string) {
        return await this.userModel.findOne({ where: { email } });
    }

    async findByPhoneNumber(phone: string) {
        return await this.userModel.findOne({ where: { phone } });
    }

    async create(user: UserCreateDto) {
        return await this.userModel.create(user);
    }

    async createUserByGGFb<T>(user: T) {
        return await this.userModel.create(user);
    }

    async getUser(user: User) {
        try {
            const userInfo = await this.findUserById(user.id);
            if (!userInfo) {
                return new BaseErrorResponse(
                    STATUSCODE.USER_NOT_FOUND_400,
                    'User not found'
                );
            }
            return new BaseResponse(
                STATUSCODE.USER_READ_SUCCESS_407,
                userInfo,
                'Get user info successfully'
            );
        } catch (err) {
            return new BaseErrorResponse(
                STATUSCODE.USER_NOT_FOUND_400,
                'User not found'
            );
        }
    }

    async updateUser(userRequest: User, user: UserDto) {
        try {
            const userReceive = await this.userModel.findByIdAndUpdate({ _id: userRequest.id }, user);
            if (!userReceive) {
                return new BaseErrorResponse(
                    STATUSCODE.USER_NOT_FOUND_400,
                    'User not found',
                    null
                )
            }
            return new BaseResponse(
                STATUSCODE.USER_UPDATE_SUCCESS_402,
                user,
                'Update successfully'
            )
        } catch (err) {
            return new BaseErrorResponse(
                STATUSCODE.USER_NOT_FOUND_400,
                'User not found',
                null
            )
        }
    }

    async updateSomeField<T>(userRequest: User, user: T) {
        return await this.userModel.findByIdAndUpdate({ _id: userRequest.id }, { $set: user }, { new: true });
    }

    async updateSomeFieldWithId<T>(_id: string, user: T) {
        return await this.userModel.findByIdAndUpdate({ _id }, { $set: user }, { new: true });
    }

    public async findAll(paginationQuery: PaginationQueryDto): Promise<any> {
        const { limit, offset } = paginationQuery;

        const users = await this.userModel.find().skip(offset).limit(limit);
        return new BaseResponse(STATUSCODE.USER_LIST_SUCESS_409,
            users,
            `Get list user successfully`,
        )
    }

    public async updatePhoneNumber(user: User, dto: UpdateUserDto) {
        try {
            const userByPhone = await this.findUserById(user.id);
            if (!userByPhone) {
                return new BaseErrorResponse(
                    STATUSCODE.PHONE_NOTFOUND_4012,
                    'User not found');
            }
            const newUser = await this.updateSomeField(user, dto);
            const access_token = await this.jwt.signToken(dto.phone, newUser.fullname);
            return new BaseResponse(
                STATUSCODE.PHONE_UPDATE_SUCCESS_4011,
                {
                    user: newUser,
                    access_token: access_token,
                },
                'Update phone number successfully'
            )
        } catch (error) {
            return new BaseErrorResponse(
                STATUSCODE.PHONE_NOTFOUND_4012,
                'User not found');
        }
    }

    async updateAvatar(user: User, dto: AvataDto) {
        try {
            const userById = await this.findUserById(user.id);
            if (!userById) {
                return new BaseErrorResponse(
                    STATUSCODE.PHONE_NOTFOUND_4012,
                    'User not found');
            }

            const newUser = await this.updateSomeField(user, dto);
            return new BaseResponse(
                STATUSCODE.USER_AVATAR_UPLOADED_4013,
                newUser,
                'Update avata number successfully'
            )
        } catch (error) {
            console.log(error);
            return new BaseErrorResponse(
                STATUSCODE.PHONE_NOTFOUND_4012,
                'User not found');
        }
    }
}
