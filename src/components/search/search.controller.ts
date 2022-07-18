import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
@ApiTags('search')
@Controller('/api/v1/search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Get('/health')
    getHealthCheck() {
        return {
            status: 'ok from company service'
        };
    }
}
