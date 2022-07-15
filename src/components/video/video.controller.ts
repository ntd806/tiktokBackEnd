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
import { ProductServiceInterface } from './interface/video.service.interface';
import { CreateProductDto } from './dto/create.video.dto';
import { Product } from './entity/video.entity';

@Controller('products')
export class ProductController {
    constructor(
        @Inject('ProductServiceInterface')
        private readonly productService: ProductServiceInterface
    ) {}

    @Post()
    public async create(
        @Body() productDto: CreateProductDto
    ): Promise<Product> {
        return this.productService.create(productDto);
    }

    @Patch('/:id')
    public async update(
        @Param('id') id: string,
        @Body() updateProduct: any
    ): Promise<Product> {
        return this.productService.update(id, updateProduct);
    }

    @Get('/search')
    public async search(@Query() query: any): Promise<any> {
        return this.productService.search(query.q);
    }
}
