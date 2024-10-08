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
exports.BillsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BillsService = class BillsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBillDto) {
        const { factureNumber, items } = createBillDto;
        const existingBill = await this.prisma.bill.findUnique({
            where: { factureNumber },
        });
        if (existingBill) {
            throw new common_1.BadRequestException('Facture number already exists');
        }
        return this.prisma.bill.create({
            data: {
                factureNumber,
                items: {
                    create: items,
                },
            },
            include: {
                items: true,
            },
        });
    }
    async findFactureNumber(factureNumber) {
        const billInfo = await this.prisma.billInfo.findUnique({
            where: {
                factureNumber,
            },
        });
        return billInfo;
    }
    async getBillByFactureNumber(factureNumber) {
        return await this.prisma.bill.findUnique({
            where: { factureNumber },
        });
    }
    async findByFactureNumber(factureNumber) {
        const bill = await this.prisma.bill.findUnique({
            where: { factureNumber },
            include: {
                items: true,
            },
        });
        return bill;
    }
    async createBillInfo(billInfoDto) {
        const { client, factureNumber, Date, Subtotal, SalesTax, TotalValue } = billInfoDto;
        const existingBill = await this.prisma.billInfo.findUnique({
            where: { factureNumber: factureNumber },
        });
        if (existingBill) {
            throw new common_1.BadRequestException('Facture number already exists');
        }
        return this.prisma.billInfo.create({
            data: {
                client,
                factureNumber,
                Date,
                Subtotal,
                SalesTax,
                TotalValue,
            },
        });
    }
};
exports.BillsService = BillsService;
exports.BillsService = BillsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BillsService);
//# sourceMappingURL=bills.service.js.map