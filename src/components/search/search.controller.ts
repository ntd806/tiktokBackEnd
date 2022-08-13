import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { SearchService } from './search.service';
import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiBody, 
    ApiConsumes 
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express'
import {
    CreateProductDto,
    UpdateProductDto,
    SearchProductDto
} from './dto/index';
import { multerOptions } from '../../vender/helper/Helper'
@Controller('/api/v1/search')
@ApiTags('search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Post('insert-index')
    @ApiOperation({
        summary: 'Insert index'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                name: {
                    type: 'string',
                },
                description: {
                    type: 'string'
                },
                url: {
                    type: 'string'
                },
                preview: {
                    type: 'string'
                },
                tag: {
                    type: 'string'
                },
                type: {
                    type: 'number'
                },
                time: {
                    type: 'number'
                }
            },
        },
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    @ApiResponse({
        status: 200,
        description: 'insert index success'
    })
    public async insertIndex(
        @Body() createProductDto: CreateProductDto,
        @UploadedFile('file') file
    ): Promise<any> {
        return this.searchService.insertIndex(createProductDto, file.path);
    }

    @Put('update-index')
    @ApiOperation({
        summary: 'Update index'
    })
    @ApiResponse({
        status: 200,
        description: 'update index success'
    })
    public async updateIndex(
        @Body() updateGameDto: UpdateProductDto
    ): Promise<any> {
        return this.searchService.updateIndex(updateGameDto);
    }

    @Get('search-index')
    @ApiOperation({
        summary: 'search index'
    })
    @ApiResponse({
        status: 200,
        description: 'search index success'
    })
    public async searchIndex(
        @Query() searchProductDto: SearchProductDto
    ): Promise<any> {
        return this.searchService.searchIndex(searchProductDto);
    }

    @Delete('delete-index')
    @ApiOperation({
        summary: 'delete index'
    })
    @ApiResponse({
        status: 200,
        description: 'delete index success'
    })
    public async deleteIndex(@Body() body): Promise<any> {
        return this.searchService.deleteIndex(body);
    }

    @Delete('delete-document')
    @ApiOperation({
        summary: 'delete document'
    })
    @ApiResponse({
        status: 200,
        description: 'delete document success'
    })
    public async deleteDocument(@Body() body): Promise<any> {
        return this.searchService.deleteDocument(body);
    }
}
