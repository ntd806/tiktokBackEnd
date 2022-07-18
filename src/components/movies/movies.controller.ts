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
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MoviesServiceInterface } from './interface/videos.service.interface';
import { CreateVideoDto } from './dto/create.videos.dto';
import { Movies } from './entity/movies.entity';

@ApiTags('movies')
@Controller('/api/v1/movies')
@Controller('products')
export class MoviesController {
    constructor(
        @Inject('MoviesServiceInterface')
        private readonly productService: MoviesServiceInterface
    ) {}

    @Post()
    public async create(@Body() productDto: CreateVideoDto): Promise<Movies> {
        return this.productService.create(productDto);
    }

    @Patch('/:id')
    public async update(
        @Param('id') id: string,
        @Body() updateProduct: any
    ): Promise<Movies> {
        return this.productService.update(id, updateProduct);
    }

    @Get('/search')
    public async search(@Query() query: any): Promise<any> {
        return this.productService.search(query.q);
    }
}
