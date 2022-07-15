import { Inject, Injectable } from '@nestjs/common';
import { VideoRepositoryInterface } from './interface/video.repository.interface';
import { VideoServiceInterface } from './interface/video.service.interface';
import { CreateVideoDto } from './dto/create.video.dto';
import { Video } from './entity/video.entity';
import { VideoSearchObject } from './model/video.search.object';
import { SearchServiceInterface } from '../../services/search/interface/search.service.interface';

@Injectable()
export class VideoService implements VideoServiceInterface {
    constructor(
        @Inject('ProductRepositoryInterface')
        private readonly productRepository: VideoRepositoryInterface,
        @Inject('SearchServiceInterface')
        private readonly searchService: SearchServiceInterface<any>
    ) {}

    public async create(productDto: CreateVideoDto): Promise<Video> {
        const video = new Video();
        // product.name = productDto.name;
        // product.description = productDto.description;
        // product.price = productDto.price;
        return this.productRepository.create(video);
    }

    public async update(vidoeId: any, updateProduct: any): Promise<Video> {
        const video = await this.productRepository.findOneById(vidoeId);
        // product.name = updateProduct.name;
        // product.description = updateProduct.description;
        // product.price = updateProduct.price;
        return this.productRepository.create(video);
    }

    public async search(q: any): Promise<any> {
        const data = VideoSearchObject.searchObject(q);
        return this.searchService.searchIndex(data);
    }
}
