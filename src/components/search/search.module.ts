import { Module } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchServiceInterface } from "./interface/search.service.interface";
import { SearchController } from './search.controller';

@Module({
  imports: [],
  providers: [
    {
      provide: "SearchServiceInterface",
      useClass: SearchService
    }
  ],
  controllers: [SearchController],
  exports: [SearchModule]
})
export class SearchModule {}
