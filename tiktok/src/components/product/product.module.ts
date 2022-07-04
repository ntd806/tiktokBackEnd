import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductRepositoryInterface } from './interface/product.repository.interface';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductServiceInterface } from './interface/product.service.interface';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SearchService } from '../../services/search/search.service';
import { SearchServiceInterface } from '../../services/search/interface/search.service.interface';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
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
