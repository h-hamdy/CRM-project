export declare class CreateColumnsDto {
    tableName: string;
    columns: Array<{
        name: string;
    }>;
}
export declare class InsertDataDto {
    data: {
        data: {
            [key: string]: any;
        };
    };
}
