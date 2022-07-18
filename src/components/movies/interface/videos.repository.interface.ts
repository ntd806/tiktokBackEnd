import { BaseInterfaceRepository } from '../../repositories/base/base.interface.repository';
import { Movies } from '../entity/movies.entity';

export type MoviesRepositoryInterface = BaseInterfaceRepository<Movies>;
