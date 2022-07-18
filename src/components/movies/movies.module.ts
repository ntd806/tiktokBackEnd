import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { SearchModule } from '../search/search.module';
import { MoviesService } from './movies.service';

@Module({
    controllers: [MoviesController],
    providers: []
})
export class MoviesModule {}
