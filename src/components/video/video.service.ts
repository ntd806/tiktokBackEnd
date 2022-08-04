import { Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { User } from './model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from './dto/pagination.query.dto';

@Injectable()
export class VideoService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {}

    async likeVideo(user: User, likeDto: LikeDto) {
        let likeUpdate = [];
        if (typeof user.like == 'undefined') {
            likeUpdate = [{ url: likeDto.url, isLive: likeDto.isLive }];
        } else {
            likeUpdate = user.like;
            const index = likeUpdate.find(
                ({ url }) => url === likeDto.url
            );
            if (index) {
                return {
                    code: 90002,
                    data: true,
                    message: 'Like video false'
                };
            } else {
                likeUpdate.push({ url: likeDto.url, isLive: likeDto.isLive });
            }
        }
        console.log(likeUpdate);
        await this.userModel.findOneAndUpdate(
            { _id: user._id },
            {
                like: likeUpdate
            }
        );
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
                ({ url }) => url === likeDto.url
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

    async getListVideoLiked(user: User, paginationQuery: PaginationQueryDto) {
        try {
            const { limit, offset } = paginationQuery;
            console.log(paginationQuery);
            return {
                code: 90005,
                data: user.like.slice((offset-1)*limit, offset*limit),
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
