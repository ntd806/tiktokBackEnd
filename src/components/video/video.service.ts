import { Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { User } from './model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VideoService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {}

    async likeVideo(user: User, likeDto: LikeDto) {
        console.log(likeDto);
        let likeUpdate = [];
        if (typeof user.like == 'undefined') {
            likeUpdate = [{ video_id: likeDto.video_id, isLive: likeDto.isLive }];
        } else {
            likeUpdate = user.like;
            const index = likeUpdate.find(
                ({ video_id }) => video_id === likeDto.video_id
            );
            if (index) {
                return {
                    code: 90002,
                    data: true,
                    message: 'Like video false'
                };
            } else {
                likeUpdate.push({ video_id: likeDto.video_id, isLive: likeDto.isLive });
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
            code: 90001,
            data: true,
            message: 'Like video successfully'
        };
    }

    async unlikeVideo(user: User, likeDto: LikeDto) {
        let likeUpdate = [];
        if (typeof user.like == 'undefined') {
            return {
                code: 90004,
                data: true,
                message: 'Unlike video false'
            };
        } else {
            likeUpdate = user.like;
            const index = likeUpdate.find(
                ({ video_id }) => video_id === likeDto.video_id
            );
            if (index) {
                likeUpdate = likeUpdate.splice(index, 1);
            } else {
                return {
                    code: 90004,
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
            code: 90003,
            data: true,
            message: 'Unlike video successfully'
        };
    }

    async getListVideoLiked(user: User, param) {
        try {
            let page = param.page ? param.page : 1;
            let limit = param.limit ? param.limit : 5;
            return {
                code: 90005,
                data: user.like.slice((page-1)*limit, page*limit),
                message: 'Get list video successfully'
            };
        } catch(err) {
            return {
                code: 90006,
                data: false,
                message: 'Get list video failed'
            };
        }
        
    }
}
