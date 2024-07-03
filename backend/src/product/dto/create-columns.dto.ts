// create-columns.dto.ts

import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateColumnsDto {
  @IsString()
  @IsNotEmpty()
  tableName: string;

  @IsArray()
  @IsNotEmpty()
  columns: Array<{ name: string }>;
}


import { IsInt, IsObject } from 'class-validator';

export class InsertDataDto {
  @IsObject()
  @IsNotEmpty()
  data: object;
}
