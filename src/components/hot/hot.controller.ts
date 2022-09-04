import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiQuery
} from '@nestjs/swagger';
import { HotService } from './hot.service';
import { CreateHotDto } from './dto';
import { STATUSCODE } from 'src/constants';
import { PaginationQueryDto } from '../video/dto/pagination.query.dto';
import { JwtGuard } from '../auth/guard';

@ApiTags('hot')
@ApiBearerAuth('Authorization')
@Controller('/api/v1/hot')
@UseGuards(JwtGuard)
@Controller('hot')
export class HotController {
    constructor(private hotService: HotService) {}

    @ApiOperation({
        summary: 'Add new a hot trend'
    })
    @ApiResponse({
        status: 220001,
        description: 'Trend has been created successfully'
    })
    @ApiResponse({
        status: 220004,
        description: 'Error: Trend not created!'
    })
    @Post()
    public async addSupport(@Body() CreateHotDto: CreateHotDto) {
        return this.hotService.add(CreateHotDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all trend'
    })
    public async getAllGame() {
        return await this.hotService.getHotTrend();
    }

    @ApiOperation({
        summary: 'Get hot trend'
    })
    @ApiResponse({
        status: STATUSCODE.LISTED_SUCCESS_9010,
        description: 'Get list video successfully'
    })
    @ApiResponse({
        status: STATUSCODE.LISTED_FAIL_9011,
        description: 'Get list video failed'
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
    @Get('get-hot-trend')
    async getHotTrend(@Query() paginationQueryDto: PaginationQueryDto) {
        return await this.hotService.getTrend(paginationQueryDto);
    }
}
