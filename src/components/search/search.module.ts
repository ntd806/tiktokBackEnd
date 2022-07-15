import { Module } from '@nestjs/common';
import { SearchService } from '@services/search/search.service';
import { SearchServiceInterface } from '@services/search/interface/search.service.interface';

@Module({
    providers: [
        {
            provide: 'SearchServiceInterface',
            useClass: SearchService
        }
    ],
    exports: [SearchModule]
})
export class SearchModule {}
