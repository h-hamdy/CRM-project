import { PrismaService } from 'src/prisma/prisma.service';
import { BillInfo, CreateBillDto } from './dto/create-bill.dto';
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
        factureNumber: string;
    }>;
    findFactureNumber(factureNumber: string): Promise<{
        id: number;
        client: string;
        factureNumber: string;
        Date: string;
        Subtotal: string;
        SalesTax: string;
        TotalValue: string;
    }>;
    getBillByFactureNumber(factureNumber: string): Promise<{
        id: number;
        factureNumber: string;
    }>;
    findByFactureNumber(factureNumber: string): Promise<{
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
        factureNumber: string;
    }>;
    createBillInfo(billInfoDto: BillInfo): Promise<{
        id: number;
        client: string;
        factureNumber: string;
        Date: string;
        Subtotal: string;
        SalesTax: string;
        TotalValue: string;
    }>;
}
