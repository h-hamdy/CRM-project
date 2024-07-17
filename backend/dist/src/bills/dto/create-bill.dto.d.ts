declare class ItemDto {
    Qte: number;
    Tarif?: number;
    TarifN?: number;
    Title: string;
    Total: string;
    key: string;
}
export declare class CreateBillDto {
    factureNumber: string;
    items: ItemDto[];
}
export declare class BillInfo {
    client: string;
    factureNumber: string;
    Date: string;
    Subtotal: string;
    SalesTax: string;
    TotalValue: string;
}
export {};
