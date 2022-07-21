import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('health')
@Controller('/api/v1')
export class AppController {
    @ApiOperation({
        summary: 'Check sever is live'
    })
    @Get('/health')
    getHealthCheck() {
        return {
            status: 'ok from company service'
        };
    }
}
