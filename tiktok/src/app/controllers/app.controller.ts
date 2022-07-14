import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

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
