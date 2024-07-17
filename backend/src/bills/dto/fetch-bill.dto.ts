// fetch-bill.dto.ts
import { IsString } from 'class-validator';

export class FetchBillDto {
  @IsString()
  factureNumber: string;
}
