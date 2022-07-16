import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchServiceInterface } from './interface/search.interface';

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
