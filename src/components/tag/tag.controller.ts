import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Delete,
    Query,
    UseGuards,
    Request
} from '@nestjs/common';
import {
    ApiTags,
    ApiQuery,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth
} from '@nestjs/swagger';
import { TagService } from './tag.service';
import { TagDto, TagUpdateDto } from './dto';
import { PaginationQueryDto } from './dto/pagination.query.dto';
import { JwtGuard } from '../auth/guard';

@ApiTags('tag')
@UseGuards(JwtGuard)
@ApiBearerAuth('Authorization')
@Controller('/api/v1/tag')
@UseGuards(JwtGuard)
export class TagController {
    constructor(private TagService: TagService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all tags'
    })
    @ApiQuery({
        name: 'limit',
        type: 'number',
        description: 'enter limit of record',
        required: true
    })
    @ApiQuery({
        name: 'offset',
        type: 'number',
        description: 'enter offset of record',
        required: true
    })
    @ApiResponse({
        status: 10005,
        description: 'Get all tag success'
    })
    @ApiResponse({
        status: 10006,
        description: 'Get list tag failed'
    })
    public async getAllTag(
        @Request() req,
        @Query() paginationQuery: PaginationQueryDto
    ) {
        return await this.TagService.findAll(req.user, paginationQuery);
    }

    @ApiOperation({
        summary: 'Add new tag'
    })
    @ApiResponse({
        status: 10001,
        description: 'Tag has been created successfully'
    })
    @ApiResponse({
        status: 10002,
        description: 'Error: Tag not created!'
    })
    @Post()
    public async addTag(@Request() req, @Body() tagDto: TagDto) {
        return await this.TagService.create(req.user, tagDto);
    }

    @ApiOperation({
        summary: 'Update tag by id'
    })
    @ApiResponse({
        status: 10003,
        description: 'Tag has been successfully updated'
    })
    @ApiResponse({
        status: 10004,
        description: 'Error: Tag not updated!'
    })
    @Put('/update')
    public async updateTag(@Request() req, @Body() TagUpdateDto: TagUpdateDto) {
        return await this.TagService.update(req.user, TagUpdateDto);
    }

    @ApiOperation({
        summary: 'Delete tag by id'
    })
    @ApiResponse({
        status: 10008,
        description: 'Tag has been deleted'
    })
    @ApiResponse({
        status: 10007,
        description: 'Delete tag failed'
    })
    @Delete('/delete')
    public async deleteTag(@Request() req, @Body() tagDto: TagDto) {
        return await this.TagService.remove(req.user, tagDto);
    }
}
