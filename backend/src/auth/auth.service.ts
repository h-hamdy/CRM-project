import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, AuthDtoSignin } from "./dto";
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import { EmailService } from "./email/email.service";


@Injectable()
export class AuthService{
	constructor(
		private readonly configService: ConfigService,
		private prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly emailService: EmailService 
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
	  

		async createUser(email: string, firstName: string, lastName: string, number: string): Promise<{ email: string; password: string }> {
		if (!email || !firstName || !lastName )
			throw new UnauthorizedException("Invalid Credentials!")

		console.log(number)

		const checkUser = await this.prisma.user.findUnique({ where: { email: email } });

    		// If user does not exist, throw UnauthorizedException
		if (checkUser) {
			throw new UnauthorizedException('Invalid email');
		}
			// Generate a random password
		var password = crypto.randomBytes(8).toString('hex');

		password = password + "P!1l"
	
		// Hash the password
		const hash = await argon2.hash(password);
	
		// Save the new user in the db
		const user = await this.prisma.user.create({
			data: {
			  email,
			  hash,
			  firstName,
			  lastName,
			  number, // Save number if provided
			} as any, // Type assertion here
			select: {
			  id: true,
			  email: true,
			  createdAt: true,
			},
		  });

		await this.emailService.sendMail(
			email,
			'Your new account',
			`Hello ${firstName},\n\nYour account has been created. Here are your credentials:\n\nEmail: ${email}\nPassword: ${password}\n\n`
		  );
	
		// Return the generated password
		return { email: user.email, password };
	  }

}