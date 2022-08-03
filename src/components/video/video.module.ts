import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { UserSchema, User } from './model/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        JwtModule.register({ secret: process.env.SECRET }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [VideoService],
    controllers: [VideoController]
})
export class VideoModule {}
