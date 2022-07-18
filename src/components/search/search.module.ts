import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchServiceInterface } from './interface/search.interface';
import { SearchController } from './search.controller';
@Module({
    providers: [
        {
            provide: 'SearchServiceInterface',
            useClass: SearchService
        }
    ],
    exports: [SearchModule],
    controllers: [SearchController]
})
export class SearchModule {}
