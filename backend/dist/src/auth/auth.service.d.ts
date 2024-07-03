import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, AuthDtoSignin } from "./dto";
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly configService;
    private prisma;
    private readonly jwtService;
    constructor(configService: ConfigService, prisma: PrismaService, jwtService: JwtService);
    singup(dto: AuthDto): Promise<{
        email: string;
        id: number;
        createdAt: Date;
    }>;
    signin(dto: AuthDtoSignin): Promise<string>;
}
