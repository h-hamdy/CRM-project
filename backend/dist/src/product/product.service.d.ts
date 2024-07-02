import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    appendColumns(newColumns: string[] | any[]): Promise<{
        id: number;
        columns: string;
    }>;
    getColumns(): Promise<string>;
}
