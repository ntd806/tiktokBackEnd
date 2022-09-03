import { Controller, UseGuards, Post, Body, Get } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiQuery
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { HotService } from './hot.service';
import { CreateHotDto } from './dto';
import { SearchProductDto } from '../search/dto';
import { MESSAGE, STATUSCODE } from 'src/constants';

@ApiTags('hot')
@UseGuards(JwtGuard)
@ApiBearerAuth('Authorization')
@Controller('/api/v1/hot')
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
        name: 'search',
        type: 'string',
        description: 'filter',
        required: false
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
    async getHotTrend(searchProductDto: SearchProductDto) {
        return await this.hotService.getTrend(searchProductDto);
    }
}
