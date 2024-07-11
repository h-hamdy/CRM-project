// create-bill.dto.ts
import { IsString, IsNumber, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDto {
  @IsNumber()
  Qte: number;

  @IsOptional()
  @IsNumber()
  Tarif?: number;

  @IsOptional()
  @IsNumber()
  TarifN?: number;

  @IsString()
  Title: string;

  @IsString()
  Total: string;

  @IsString()
  key: string;
}

export class CreateBillDto {
  @IsNumber()
  factureNumber: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}
