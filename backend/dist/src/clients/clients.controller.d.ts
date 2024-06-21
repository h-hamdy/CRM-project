import { ClientsService } from './clients.service';
import { ClientDto } from './dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
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
        message: string;
    }>;
}
