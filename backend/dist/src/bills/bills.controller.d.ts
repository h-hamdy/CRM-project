import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
export declare class BillsController {
    private readonly billsService;
    constructor(billsService: BillsService);
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
