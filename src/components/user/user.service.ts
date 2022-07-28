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
        return {
            code: 40002,
            data: newUser,
            message: 'Update successfully'
        };
    }

    async likeVideo(user: User, video_id: string) {
        let likeUpdate = [];
        if (typeof user.like == 'undefined') {
            likeUpdate = [{ video_id: video_id }];
        } else {
            likeUpdate = user.like;
            const index = likeUpdate.find(
                ({ video_id }) => video_id === video_id
            );
            if (index) {
                return {
                    code: 70003,
                    data: true,
                    message: 'Like video false'
                };
            } else {
                likeUpdate.push({ video_id: video_id });
            }
        }
        await this.userModel.findOneAndUpdate(
            { _id: user._id },
            {
                like: likeUpdate
            }
        );
        await user.save();
        return {
            code: 70001,
            data: true,
            message: 'Like video successfully'
        };
    }

    async unlikeVideo(user: User, video_id: string) {
        let likeUpdate = [];
        if (typeof user.like == 'undefined') {
            return {
                code: 70004,
                data: true,
                message: 'Unlike video false'
            };
        } else {
            likeUpdate = user.like;
            const index = likeUpdate.find(
                ({ video_id }) => video_id === video_id
            );
            if (index) {
                likeUpdate = likeUpdate.splice(index, 1);
            } else {
                return {
                    code: 70004,
                    data: true,
                    message: 'Unlike video false'
                };
            }
        }
        await this.userModel.findOneAndUpdate(
            { _id: user._id },
            {
                like: likeUpdate
            }
        );
        await user.save();
        return {
            code: 70002,
            data: true,
            message: 'Unlike video successfully'
        };
    }
}
