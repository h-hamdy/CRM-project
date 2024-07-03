import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColumnsDto, InsertDataDto } from './dto/create-columns.dto';
import { Prisma } from '@prisma/client';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    getColumnsByTableId(tableId: number): Promise<{
        id: number;
        name: string;
        tableId: number;
    }[]>;
    createTableWithColumns(createColumnsDto: CreateColumnsDto): Promise<{
        id: number;
        name: string;
    }>;
    getAllDataRows(): Promise<{
        id: number;
        tableId: number;
        data: Prisma.JsonValue;
    }[]>;
    insertData(insertDataDto: InsertDataDto): Promise<{
        id: number;
        tableId: number;
        data: Prisma.JsonValue;
    }>;
}
