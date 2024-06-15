import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator"

export class AuthDto {

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsString()
	@IsOptional()
	_number?: string;
}

export class AuthDtoSignin {

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}