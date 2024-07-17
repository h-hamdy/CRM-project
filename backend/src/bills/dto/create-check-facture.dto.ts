import { IsString } from 'class-validator';

export class CheckFactureDto {
  @IsString()
  factureNumber: string;
}
