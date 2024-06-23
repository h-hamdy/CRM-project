import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from 'src/auth/email/email.service';
export declare class UsersService {
    private prisma;
    private readonly emailService;
    constructor(prisma: PrismaService, emailService: EmailService);
    createUser(email: string, firstName: string, lastName: string, number: string): Promise<{
        email: string;
        password: string;
    }>;
    findAll(): Promise<Partial<User>[]>;
    upsertInfo(data: {
        address: string;
        email: string;
        phone: string;
        website: string;
    }): Promise<{
        id: number;
        address: string;
        email: string;
        phone: string;
        website: string;
    }>;
    getInfo(): Promise<{
        id: number;
        address: string;
        email: string;
        phone: string;
        website: string;
    }>;
}
