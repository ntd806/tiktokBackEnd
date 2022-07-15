import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('/api/v1')
export class AppController {
    @Get('/health')
    getHealthCheck() {
        return {
            status: 'ok from company service'
        };
    }
}
