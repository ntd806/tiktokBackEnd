import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchServiceInterface } from './interface/search.service.interface';
import { ConfigSearch } from './config/config.search';
import { productIndex } from './constant/product.elastic';
import { BaseResponse } from 'src/common';
import { MESSAGE, STATUSCODE } from 'src/constants';
// import { ProductSearchObject } from './model/product.search.object';
@Injectable()
export class SearchService
    extends ElasticsearchService
    implements SearchServiceInterface<any>
{
    constructor() {
        super(ConfigSearch.searchConfig(process.env.ELASTIC_SEARCH_URL));
    }

    public async insertIndex(bulkData: any): Promise<any> {
        const data = this.productDocument(bulkData);
        try {
            const res = await this.bulk(data);
            return new BaseResponse(HttpStatus.CREATED, res, MESSAGE.CREATE_SUCCESS)
        } catch (err) {
            console.log(err);
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async updateIndex(updateData: any): Promise<any> {
        const data = this.productDocument(updateData);
        await this.productDocument(updateData.id);
        // return this.insertIndex(data);
    }

    public async searchIndex(searchData: any): Promise<any> {
        // const data = ProductSearchObject.searchObject(searchData);
        return this.search({
            index: productIndex._index,
            body: {
                size: searchData.limit,
                from: searchData.offset,
                query: {
                    multi_match: {
                        query: searchData.search,
                        fields: ['name', 'description', 'url', 'preview', 'tag']
                    }
                }
            }
        })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(err);
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    public async deleteIndex(indexData: any): Promise<any> {
        return this.indices
            .delete(indexData)
            .then((res) => res)
            .catch((err) => {
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    public async deleteDocument(indexData: any): Promise<any> {
        return this.delete(indexData)
            .then((res) => res)
            .catch((err) => {
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    private bulkIndex(productId: number): any {
        return {
            _index: productIndex._index,
            _type: productIndex._type,
            _id: productId
        };
    }

    private productDocument(product: any): any {
        const bulk = [];
        bulk.push({
            index: this.bulkIndex(product.id)
        });
        bulk.push(product);
        return {
            body: bulk,
            index: productIndex._index,
            type: productIndex._type
        };
    }

    private checkfield(data: any): boolean {
        if (!isNaN(data)) {
            return true;
        }

        return false;
    }
}
