import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entity/video.entity';
import { VideoRepositoryInterface } from './interface/video.repository.interface';
import { VideoService } from './video.service';
import { VideoRepository } from '../../repositories/video.repository';
import { VideoServiceInterface } from './interface/video.service.interface';
import { VideoController } from './video.controller';
import {  } from './video.service';
import { SearchService } from '../../services/search/search.service';
import { SearchServiceInterface } from '../../services/search/interface/search.service.interface';

@Module({
    imports: [TypeOrmModule.forFeature([Video, VideoRepository])],
    providers: [
        {
            provide: 'VideoRepositoryInterface',
            useClass: VideoRepository
        },
        {
            provide: 'VideoServiceInterface',
            useClass: VideoService
        },
        {
            provide: 'SearchServiceInterface',
            useClass: SearchService
        }
    ],
    controllers: [VideoController]
})
export class VideoModule {}
