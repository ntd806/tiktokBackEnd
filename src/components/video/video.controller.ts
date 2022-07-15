import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { VideoServiceInterface } from './interface/video.service.interface';
import { CreateVideoDto } from './dto/create.video.dto';
import { Video } from './entity/video.entity';

@Controller('videos')
export class VideoController {
    constructor(
        @Inject('videoServiceInterface')
        private readonly videoService: VideoServiceInterface
    ) {}

    @Post()
    public async create(
        @Body() videoDto: CreateVideoDto
    ): Promise<Video> {
        return this.videoService.create(videoDto);
    }

    @Patch('/:id')
    public async update(
        @Param('id') id: string,
        @Body() updateVideo: any
    ): Promise<Video> {
        return this.videoService.update(id, updateVideo);
    }

    @Get('/search')
    public async search(@Query() query: any): Promise<any> {
        return this.videoService.search(query.q);
    }
}
