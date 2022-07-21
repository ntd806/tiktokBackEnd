import { Controller } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    public async insert(): Promise<any> {
        return this.searchService.insertIndex()
    }
}
