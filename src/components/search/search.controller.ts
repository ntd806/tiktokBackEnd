import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('search')
@Controller('/api/v1/search')
export class SearchController {
    @Get('/health')
    getHealthCheck() {
        return {
            status: 'ok from company service'
        };
    }
}
