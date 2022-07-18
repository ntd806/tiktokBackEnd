import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesRepository } from '../repositories/movies.repository';
import { SearchService } from '../search/search.service';
import { MoviesRepositoryInterface } from './interface/videos.repository.interface';
import { MoviesServiceInterface } from './interface/videos.service.interface';
import { SearchServiceInterface } from '../search/interface/search.interface';

@Module({
    providers: [
        {
            provide: 'MoviesRepositoryInterface',
            useClass: MoviesRepository
        },
        {
            provide: 'MoviesServiceInterface',
            useClass: MoviesService
        },
        {
            provide: 'SearchServiceInterface',
            useClass: SearchService
        }
    ],
    controllers: [MoviesController]
})
export class MoviesModule {}
