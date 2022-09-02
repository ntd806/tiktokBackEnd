import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reaction, ReactionSchema } from './model/reaction.schema';
import { Video, VideoSchema } from './model/video.schema';

@Module({
    imports: [
        JwtModule.register({ secret: process.env.SECRET }),
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }, {
            name: Reaction.name, schema: ReactionSchema
        }])
    ],
    providers: [VideoService],
    controllers: [VideoController]
})
export class VideoModule { }
