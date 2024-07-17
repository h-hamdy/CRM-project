import { BillsService } from './bills.service';
import { BillInfo, CreateBillDto } from './dto/create-bill.dto';
import { CheckFactureDto } from './dto/create-check-facture.dto';
import { FetchBillDto } from './dto/fetch-bill.dto';
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
        factureNumber: string;
    }>;
    getBillInfoByFactureNumber(body: {
        factureNumber: string;
    }): Promise<{
        id: number;
        client: string;
        factureNumber: string;
        Date: string;
        Subtotal: string;
        SalesTax: string;
        TotalValue: string;
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
    checkFactureNumber(checkFactureDto: CheckFactureDto): Promise<{
        exists: boolean;
    }>;
    fetchByFactureNumber(fetchBillDto: FetchBillDto): Promise<{
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
}
