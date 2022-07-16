import { Inject, Injectable } from '@nestjs/common';
import { SearchServiceInterface } from '../interface/search.interface';
import { videoIndex } from '../constant/video.search';
import { Movies } from '../../movies/entity/movies.entity';

@Injectable()
export class MoviesElasticIndex {
    constructor(
        @Inject('SearchServiceInterface')
        private readonly searchService: SearchServiceInterface<any>
    ) {}

    public async insertMoviesDocument(movies: Movies): Promise<any> {
        const data = this.MoviesDocument(movies);
        return this.searchService.insertIndex(data);
    }

    public async updateMoviesDocument(movies: Movies): Promise<any> {
        const data = this.MoviesDocument(movies);
        await this.deleteMoviesDocument(movies.id);
        return this.searchService.insertIndex(data);
    }

    private async deleteMoviesDocument(moviesId: number): Promise<any> {
        const data = {
            index: videoIndex._index,
            type: videoIndex._type,
            id: moviesId.toString()
        };
        return this.searchService.deleteDocument(data);
    }

    private bulkIndex(moviesId: number): any {
        return {
            _index: videoIndex._index,
            _type: videoIndex._type,
            _id: moviesId
        };
    }

    private MoviesDocument(movies: Movies): any {
        const bulk = [];
        bulk.push({
            index: this.bulkIndex(movies.id)
        });
        bulk.push(movies);
        return {
            body: bulk,
            index: videoIndex._index,
            type: videoIndex._type
        };
    }
}
