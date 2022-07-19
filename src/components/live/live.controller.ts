import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { LiveService } from './live.service';
import { Live } from './entity/Live.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';

@ApiTags('live')
@Controller('/api/v1/live')
@UseGuards(JwtGuard)
export class LiveController {
    constructor(private readonly liveService: LiveService) {}

    @ApiOperation({
        summary: 'Get list live'
    })
    @ApiResponse({
        status: 200, 
        description: 'Ok'
    })
    @Get()
    
    public async getLiveList(): Promise<Live> {
        return this.liveService.getLiveList();
    }
}
