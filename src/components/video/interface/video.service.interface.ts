import { CreateProductDto } from '../dto/create.video.dto';
import { Product } from '../entity/video.entity';

export interface ProductServiceInterface {
    create(productDto: CreateProductDto): Promise<Product>;

    update(productId: any, updateProduct: any): Promise<Product>;

    search(q: any): Promise<any>;
}
