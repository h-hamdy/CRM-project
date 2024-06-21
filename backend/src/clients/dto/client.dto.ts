import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ClientDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsString()
  @IsOptional()
  address?: string;
}

export class UpdateEmailDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UpdatePhoneDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  phone: string;
}

export class UpdateAddressDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  address: string;
}

export class UpdateTypeDto {
	@IsString()
	@IsNotEmpty()
	id: string;
  
	@IsNotEmpty()
	type: string;
  }
