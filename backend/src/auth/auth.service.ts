import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, AuthDtoSignin } from "./dto";
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService{
	constructor(
		private readonly configService: ConfigService,
		private prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}
	async singup(dto: AuthDto) {
		const existingUser = await this.prisma.user.findUnique({
			where: { email: dto.email },
		  });
	  
		  // If a user with the provided email already exists, throw an error
		  if (existingUser) {
			throw new UnauthorizedException('User with this email already exists.');
		  }
		const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
		const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

		if (dto.email !== adminEmail || dto.password !== adminPassword) {
			throw new UnauthorizedException('Invalid email or password.');
		  }

		// generate the password hash
		const hash = await argon.hash(dto.password)

		// save the new user in the db
		const user = this.prisma.user.create({
			data: {
				email: dto.email,
				hash,
				firstName: dto.firstName,
				lastName: dto.lastName
			},
			select: {
				id: true,
				email: true,
				createdAt: true
			}
		})
		// return the saved user
		return user
	}

	async signin(dto: AuthDtoSignin) {
		// Check if the email exists in the database
		const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
	  
		// If user does not exist, throw UnauthorizedException
		if (!user) {
		  throw new UnauthorizedException('Invalid email or password');
		}
	  
		const passwordMatch = await argon.verify(user.hash, dto.password);
	  
		// If the passwords do not match, throw UnauthorizedException
		if (!passwordMatch) {
		  throw new UnauthorizedException('Invalid email or password');
		}
	  
		// Check if the user is an admin
		const isAdmin = dto.email === this.configService.get<string>('ADMIN_EMAIL');
	  
		const payload = { email: dto.email, isAdmin }; // Include isAdmin in the payload
		const token = this.jwtService.sign(payload, {
		  secret: this.configService.get<string>('JWT_SECRET'),
		//   expiresIn: '1h', // Customize token expiration
		});
		
		return token;
	  }
}