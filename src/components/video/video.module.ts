import { Module, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reaction, ReactionSchema } from './model/reaction.schema';
import { Video, VideoSchema } from './model/video.schema';
import { Bookmark, BookmarkSchema } from './model/bookmark.schema';
import { HotService } from '../hot/hot.service';
import { Hot, HotSchema } from '../hot/model/hot.schema';
@Module({
    imports: [
        HttpModule,
        JwtModule.register({ secret: process.env.SECRET }),
        MongooseModule.forFeature([
            { name: Video.name, schema: VideoSchema },
            {
                name: Reaction.name,
                schema: ReactionSchema
            },
            {
                name: Bookmark.name,
                schema: BookmarkSchema
            },
            { name: Hot.name, schema: HotSchema }
        ])
    ],
    providers: [VideoService, HotService],
    controllers: [VideoController]
})
export class VideoModule {}
