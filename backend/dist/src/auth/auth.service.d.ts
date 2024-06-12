import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from "./email/email.service";
export declare class AuthService {
    private readonly configService;
    private prisma;
    private readonly jwtService;
    private readonly emailService;
    constructor(configService: ConfigService, prisma: PrismaService, jwtService: JwtService, emailService: EmailService);
    singup(dto: AuthDto): Promise<{
        email: string;
        id: number;
        createdAt: Date;
    }>;
    signin(dto: AuthDto): Promise<string>;
    createUser(email: string, firstName: string, lastName: string): Promise<{
        email: string;
        password: string;
    }>;
}
