import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoRepositoryInterface } from '../components/video/interface/video.repository.interface';
import { Video } from '../components/video/entity/video.entity';

@Injectable()
export class VideoRepository
    extends BaseAbstractRepository<Video>
    implements VideoRepositoryInterface
{
    constructor(
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>
    ) {
        super(videoRepository);
    }
}
