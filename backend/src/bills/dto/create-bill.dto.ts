// create-bill.dto.ts
import { IsString, IsNumber, IsOptional, ValidateNested, IsArray, IsNotEmpty } from 'class-validator';
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
  @IsString()
  factureNumber: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}

export class BillInfo {
	@IsString()
	@IsNotEmpty()
	client: string;

	@IsString()
	@IsNotEmpty()
	factureNumber: string;

	@IsString()
	@IsNotEmpty()
	Date: string;

	@IsString()
	@IsNotEmpty()
	Subtotal: string;

	@IsString()
	@IsNotEmpty()
	SalesTax: string;

	@IsString()
	@IsNotEmpty()
	TotalValue: string;
}
