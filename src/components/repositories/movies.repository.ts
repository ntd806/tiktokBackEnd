import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesRepositoryInterface } from '../movies/interface/videos.repository.interface';
import { Movies } from '../movies/entity/movies.entity';

@Injectable()
export class MoviesRepository
    extends BaseAbstractRepository<Movies>
    implements MoviesRepositoryInterface
{
    constructor(
        @InjectRepository(Movies)
        private readonly MoviesRepository: Repository<Movies>
    ) {
        super(MoviesRepository);
    }
}
