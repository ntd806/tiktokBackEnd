import { CreateVideoDto } from '../dto/create.video.dto';
import { Video } from '../entity/video.entity';

export interface VideoServiceInterface {
    create(videoDto: CreateVideoDto): Promise<Video>;

    update(videoId: any, updateVideo: any): Promise<Video>;

    search(q: any): Promise<any>;
}
