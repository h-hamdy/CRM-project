import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
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
