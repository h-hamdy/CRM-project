import { PrismaService } from '../prisma/prisma.service';
import { ClientDto } from './dto';
export declare class ClientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createClientDto: ClientDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        type: string;
        phone: string;
        address: string;
        note: string;
    }>;
    findAll(): Promise<ClientDto[]>;
    remove(id: number): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        type: string;
        phone: string;
        address: string;
        note: string;
    }>;
}
