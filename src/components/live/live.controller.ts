import { Controller, Get, Inject } from '@nestjs/common';
import { LiveService } from './live.service';
import { Live } from './entity/Live.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('live')
@Controller('/api/v1/live')
export class LiveController {
    constructor(private readonly liveService: LiveService) {}

    @Get()
    public async getLiveList(): Promise<Live> {
        return this.liveService.getLiveList();
    }
}
