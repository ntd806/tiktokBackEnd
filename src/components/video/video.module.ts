import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/video.entity';
import { ProductRepositoryInterface } from './interface/video.repository.interface';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductServiceInterface } from './interface/video.service.interface';
import { ProductController } from './video.controller';
import { ProductService } from './video.service';
import { SearchService } from '../../services/search/search.service';
import { SearchServiceInterface } from '../../services/search/interface/search.service.interface';

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductRepository])],
    providers: [
        {
            provide: 'ProductRepositoryInterface',
            useClass: ProductRepository
        },
        {
            provide: 'ProductServiceInterface',
            useClass: ProductService
        },
        {
            provide: 'SearchServiceInterface',
            useClass: SearchService
        }
    ],
    controllers: [ProductController]
})
export class ProductModule {}
