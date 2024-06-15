import { Controller, Post, Body, Res, Get, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, AuthDtoSignin } from "./dto";
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
		async signin(@Body() dto: AuthDtoSignin, @Res({ passthrough: true }) response: Response) {
			const token = await this.authService.signin(dto);
    			// Set JWT token in cookies
				(response as any).cookie('jwt', token, {
					httpOnly: true,
					secure: false, // Set to false for local development over HTTP
				});
				console.log(token)

				return { message: 'Login successful' };
		}

		@UseGuards(JwtAuthGuard, AdminGuard)
		@Post('create-user')
		async createUser(@Body() body: { email: string; firstName: string; lastName: string, number: string }) {
			return this.authService.createUser(body.email, body.firstName, body.lastName, body.number);
		}

		@Get('check-login')
		checkLogin(@Res() res) {
			const isLoggedIn = res.req.cookies.jwt ? true : false;
			return res.status(HttpStatus.OK).json({ logged_in: isLoggedIn });
		}
}