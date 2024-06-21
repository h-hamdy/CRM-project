"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClientsService = class ClientsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createClientDto) {
        const existingUser = await this.prisma.client.findUnique({
            where: { email: createClientDto.email }
        });
        if (existingUser) {
            throw new common_1.UnauthorizedException('Client with this email already exists.');
        }
        return this.prisma.client.create({
            data: createClientDto,
        });
    }
    async findAll() {
        const clients = await this.prisma.client.findMany({
            orderBy: {
                id: 'desc',
            },
        });
        return clients.map((client) => ({
            id: client.id,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            type: client.type,
            phone: client.phone,
            address: client.address,
            note: client.note,
        }));
    }
    async remove(id) {
        const client = await this.prisma.client.findUnique({ where: { id } });
        if (!client) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found`);
        }
        return this.prisma.client.delete({ where: { id } });
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map