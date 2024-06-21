import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator"

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