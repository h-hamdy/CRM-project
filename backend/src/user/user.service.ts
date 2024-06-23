import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import { EmailService } from 'src/auth/email/email.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async createUser(
    email: string,
    firstName: string,
    lastName: string,
    number: string,
  ): Promise<{ email: string; password: string }> {
    if (!email || !firstName || !lastName)
      throw new UnauthorizedException('Invalid Credentials!');


    const checkUser = await this.prisma.user.findUnique({
      where: { email: email },
    });

    // If user does not exist, throw UnauthorizedException
    if (checkUser) {
      throw new UnauthorizedException('Invalid email');
    }
    // Generate a random password
    var password = crypto.randomBytes(8).toString('hex');

    password = password + 'P!1l';

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
      `Hello ${firstName},\n\nYour account has been created. Here are your credentials:\n\nEmail: ${email}\nPassword: ${password}\n\n`,
    );

    return { email: user.email, password };
  }

  async findAll(): Promise<Partial<User>[]> {
	const users = await this.prisma.user.findMany({
	  select: {
		email: true,
		firstName: true,
		lastName: true,
		number: true,
	  },
	  orderBy: {
		id: 'desc',
	  },
	});
  
	return users;
  }
  
  async upsertInfo(data: {
    address: string;
    email: string;
    phone: string;
    website: string;
  }) {
    const info = await this.prisma.info.upsert({
      where: { id: 1 }, // Assuming there will only be one Info with id 1
      update: {
        address: data.address,
        email: data.email,
        phone: data.phone,
        website: data.website,
      },
      create: {
        address: data.address,
        email: data.email,
        phone: data.phone,
        website: data.website,
      },
    });

    return info;
  }

  // Fetch the Info entry
  async getInfo() {
    return this.prisma.info.findUnique({ where: { id: 1 } });
  }
}
