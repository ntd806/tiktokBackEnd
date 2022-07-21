import { Inject, Injectable } from "@nestjs/common";
import { SearchServiceInterface } from "../interface/search.service.interface";
import { productIndex } from "../constant/product.elastic";

@Injectable()
export class ProductElasticIndex {
  constructor(
    @Inject("SearchServiceInterface")
    private readonly searchService: SearchServiceInterface<any>
  ) {}

  public async insertProductDocument(product: any): Promise<any> {
    const data = this.productDocument(product);
    return this.searchService.insertIndex(data);
  }

  public async updateProductDocument(product: any): Promise<any> {
    const data = this.productDocument(product);
    await this.deleteProductDocument(product.id);
    return this.searchService.insertIndex(data);
  }

  private async deleteProductDocument(prodId: number): Promise<any> {
    const data = {
      index: productIndex._index,
      type: productIndex._type,
      id: prodId.toString()
    };
    return this.searchService.deleteDocument(data);
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
}
