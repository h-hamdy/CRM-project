import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
	constructor(private authService: AuthService) {}

		@Post('signup')
		singup(@Body() dto: AuthDto) {
			return this.authService.singup(dto)
		}

		@Post('signin')
		signin() {
			return this.authService.signin()
		}
}