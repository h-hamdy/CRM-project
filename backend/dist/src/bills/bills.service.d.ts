import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBillDto } from './dto/create-bill.dto';
export declare class BillsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBillDto: CreateBillDto): Promise<{
        items: {
            id: number;
            Qte: number;
            Tarif: number;
            TarifN: number;
            Title: string;
            Total: string;
            key: string;
            billId: number;
        }[];
    } & {
        id: number;
        factureNumber: number;
    }>;
}
