import { Inject, Injectable } from '@nestjs/common';
import { MoviesRepositoryInterface } from './interface/videos.repository.interface';
import { MoviesServiceInterface } from './interface/videos.service.interface';
import { CreateVideoDto } from './dto/create.videos.dto';
import { Movies } from './entity/movies.entity';
import { MoviesSearchObject } from './model/videos.search';
import { SearchServiceInterface } from '../search/interface/search.interface';

@Injectable()
export class MoviesService implements MoviesServiceInterface {
    constructor(
        @Inject('MoviesRepositoryInterface')
        private readonly productRepository: MoviesRepositoryInterface,
        @Inject('SearchServiceInterface')
        private readonly searchService: SearchServiceInterface<any>
    ) {}

    public async create(productDto: CreateVideoDto): Promise<Movies> {
        const product = new Movies();
        // product.name = productDto.name;
        // product.description = productDto.description;
        // product.price = productDto.price;
        return this.productRepository.create(product);
    }

    public async update(productId: any, updateProduct: any): Promise<Movies> {
        const product = await this.productRepository.findOneById(productId);
        // product.name = updateProduct.name;
        // product.description = updateProduct.description;
        // product.price = updateProduct.price;
        return this.productRepository.create(product);
    }

    public async search(q: any): Promise<any> {
        const data = MoviesSearchObject.searchObject(q);
        return this.searchService.searchIndex(data);
    }
}
