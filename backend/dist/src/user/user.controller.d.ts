import { UsersService } from './user.service';
import { User } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(body: {
        email: string;
        firstName: string;
        lastName: string;
        number: string;
    }): Promise<{
        email: string;
        password: string;
    }>;
    findAll(): Promise<Partial<User>[]>;
    getCompanyInfo(): Promise<{
        id: number;
        address: string;
        email: string;
        phone: string;
        website: string;
    }>;
    upsertCompanyInfo(body: {
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
}
