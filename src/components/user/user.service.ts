import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { LikeDto } from './dto/like.dto';
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
        const newUser = await this.userModel.find({_id: user.id});
        return newUser;
    }

    async likeVideo(user: User, video_id: string) {
        console.log(user);
        let likeUpdate = [];
        if (typeof user.like == 'undefined') {
            likeUpdate = [{video_id: video_id}];
        } else {
            likeUpdate = user.like;
            const index = likeUpdate.find(({ video_id }) => video_id === video_id)
            if(index) {
                return false;
            } else {
                likeUpdate.push({video_id: video_id});
            }
            
        }
        await this.userModel.findOneAndUpdate(
            { _id: user._id },
            {
              like: likeUpdate
            }
          );
        await user.save();
        return true;
    }
}
