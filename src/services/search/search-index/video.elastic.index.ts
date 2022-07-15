import { Inject, Injectable } from '@nestjs/common';
import { SearchServiceInterface } from '../interface/search.service.interface';
import { VideoIndex } from '../constant/video.elastic';
import { Video } from '../../../components/video/entity/video.entity';

@Injectable()
export class VideoElasticIndex {
    constructor(
        @Inject('SearchServiceInterface')
        private readonly searchService: SearchServiceInterface<any>
    ) {}

    public async insertVideoDocument(Video: Video): Promise<any> {
        const data = this.VideoDocument(Video);
        return this.searchService.insertIndex(data);
    }

    public async updateVideoDocument(Video: Video): Promise<any> {
        const data = this.VideoDocument(Video);
        // await this.deleteVideoDocument(Video.id);
        return this.searchService.insertIndex(data);
    }

    private async deleteVideoDocument(prodId: number): Promise<any> {
        const data = {
            index: VideoIndex._index,
            type: VideoIndex._type,
            id: prodId.toString()
        };
        return this.searchService.deleteDocument(data);
    }

    private bulkIndex(VideoId: number): any {
        return {
            _index: VideoIndex._index,
            _type: VideoIndex._type,
            _id: VideoId
        };
    }

    private VideoDocument(Video: Video): any {
        const bulk = [];
        // bulk.push({
        //     index: this.bulkIndex(Video.id)
        // });
        bulk.push(Video);
        return {
            body: bulk,
            index: VideoIndex._index,
            type: VideoIndex._type
        };
    }
}
