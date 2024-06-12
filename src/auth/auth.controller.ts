import { Controller, Post, Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Response } from 'express';
import { AdminGuard } from './guards/admin.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController{
	constructor(private authService: AuthService, ) {}

		@Post('signup')
		async singup(@Body() dto: AuthDto) {
			return this.authService.singup(dto)
		}

		@Post('signin')
		async signin(@Body() dto: AuthDto, @Res({ passthrough: true }) response: Response) {
			const token = await this.authService.signin(dto);
    			// Set JWT token in cookies
				(response as any).cookie('jwt', token, { httpOnly: true });
				return { message: 'Login successful' };
		}

		@UseGuards(JwtAuthGuard, AdminGuard)
		@Post('create-user')
		async createUser(@Body() body: { email: string; firstName: string; lastName: string }) {
			return this.authService.createUser(body.email, body.firstName, body.lastName);
		}
}