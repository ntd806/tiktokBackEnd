import { CreateVideoDto } from '../dto/create.videos.dto';
import { Movies } from '../entity/movies.entity';

export interface MoviesServiceInterface {
    create(moviesDto: CreateVideoDto): Promise<Movies>;

    update(moviesId: any, updateMovies: any): Promise<Movies>;

    search(q: any): Promise<any>;
}
