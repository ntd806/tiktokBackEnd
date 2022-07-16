import { Inject, Injectable } from '@nestjs/common';
import { SearchServiceInterface } from '../interface/search.interface';
import { videoIndex } from '../constant/video.search';
import { Product } from '@components/product/entity/product.entity';

@Injectable()
export class ProductElasticIndex {
    constructor(
        @Inject('SearchServiceInterface')
        private readonly searchService: SearchServiceInterface<any>
    ) {}

    public async insertProductDocument(product: Product): Promise<any> {
        const data = this.productDocument(product);
        return this.searchService.insertIndex(data);
    }

    public async updateProductDocument(product: Product): Promise<any> {
        const data = this.productDocument(product);
        await this.deleteProductDocument(product.id);
        return this.searchService.insertIndex(data);
    }

    private async deleteProductDocument(prodId: number): Promise<any> {
        const data = {
            index: videoIndex._index,
            type: videoIndex._type,
            id: prodId.toString()
        };
        return this.searchService.deleteDocument(data);
    }

    private bulkIndex(productId: number): any {
        return {
            _index: videoIndex._index,
            _type: videoIndex._type,
            _id: productId
        };
    }

    private productDocument(product: Product): any {
        const bulk = [];
        bulk.push({
            index: this.bulkIndex(product.id)
        });
        bulk.push(product);
        return {
            body: bulk,
            index: videoIndex._index,
            type: videoIndex._type
        };
    }
}
