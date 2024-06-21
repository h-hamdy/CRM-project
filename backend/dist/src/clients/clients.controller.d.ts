import { ClientsService } from './clients.service';
import { ClientDto, UpdateEmailDto, UpdatePhoneDto, UpdateAddressDto, UpdateTypeDto } from './dto';
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
    updateEmail(updateEmailDto: UpdateEmailDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        type: string;
        phone: string;
        address: string;
        note: string;
    }>;
    updatePhone(UpdatePhoneDto: UpdatePhoneDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        type: string;
        phone: string;
        address: string;
        note: string;
    }>;
    updateAddress(UpdateAddressDto: UpdateAddressDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        type: string;
        phone: string;
        address: string;
        note: string;
    }>;
    updateType(updateTypeDto: UpdateTypeDto): Promise<{
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
