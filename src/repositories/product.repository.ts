import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepositoryInterface } from '../components/video/interface/video.repository.interface';
import { Product } from '../components/video/entity/video.entity';

@Injectable()
export class ProductRepository
    extends BaseAbstractRepository<Product>
    implements ProductRepositoryInterface
{
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {
        super(productRepository);
    }
}
