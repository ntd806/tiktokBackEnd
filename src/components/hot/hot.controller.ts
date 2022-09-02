import { Controller, UseGuards, Post, Body, Get } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { HotService } from './hot.service';
import { CreateHotDto } from './dto';

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
        return this.hotService.create(CreateHotDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all trend'
    })
    public async getAllGame() {
        return await this.hotService.getHotTrend();
    }
}
