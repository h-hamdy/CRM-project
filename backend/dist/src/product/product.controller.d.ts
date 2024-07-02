import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getColumns(): Promise<string>;
    appendColumns(newColumns: string[]): Promise<{
        id: number;
        columns: string;
    }>;
}
