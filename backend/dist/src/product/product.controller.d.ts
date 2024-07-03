import { ProductService } from './product.service';
import { CreateColumnsDto, InsertDataDto } from './dto/create-columns.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getColumnsByTableId(tableId: number): Promise<string[] | {
        message: string;
    }>;
    createTableWithColumns(createColumnsDto: CreateColumnsDto): Promise<{
        id: number;
        name: string;
    }>;
    insertData(insertDataDto: InsertDataDto): Promise<{
        id: number;
        tableId: number;
        data: import(".prisma/client").Prisma.JsonValue;
    }>;
    getAllDataRows(): Promise<{
        id: number;
        tableId: number;
        data: import(".prisma/client").Prisma.JsonValue;
    }[] | {
        message: string;
    }>;
}