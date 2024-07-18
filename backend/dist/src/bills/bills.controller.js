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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillsController = void 0;
const common_1 = require("@nestjs/common");
const bills_service_1 = require("./bills.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_bill_dto_1 = require("./dto/create-bill.dto");
const create_check_facture_dto_1 = require("./dto/create-check-facture.dto");
const fetch_bill_dto_1 = require("./dto/fetch-bill.dto");
let BillsController = class BillsController {
    constructor(billsService) {
        this.billsService = billsService;
    }
    create(createBillDto) {
        return this.billsService.create(createBillDto);
    }
    async getBillInfoByFactureNumber(body) {
        const { factureNumber } = body;
        const billInfo = await this.billsService.findFactureNumber(factureNumber);
        if (!billInfo) {
            throw new common_1.NotFoundException('BillInfo not found');
        }
        return billInfo;
    }
    async createBillInfo(billInfoDto) {
        return this.billsService.createBillInfo(billInfoDto);
    }
    async checkFactureNumber(checkFactureDto) {
        const { factureNumber } = checkFactureDto;
        const bill = await this.billsService.getBillByFactureNumber(factureNumber);
        if (!bill) {
            return { exists: false };
        }
        return { exists: true };
    }
    async fetchByFactureNumber(fetchBillDto) {
        const { factureNumber } = fetchBillDto;
        const bill = await this.billsService.findByFactureNumber(factureNumber);
        if (!bill) {
            throw new common_1.BadRequestException('Bill with provided factureNumber not found');
        }
        return bill;
    }
};
exports.BillsController = BillsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bill_dto_1.CreateBillDto]),
    __metadata("design:returntype", void 0)
], BillsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('get-by-facture-number'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "getBillInfoByFactureNumber", null);
__decorate([
    (0, common_1.Post)('create-bill-info'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bill_dto_1.BillInfo]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "createBillInfo", null);
__decorate([
    (0, common_1.Post)('exists'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_check_facture_dto_1.CheckFactureDto]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "checkFactureNumber", null);
__decorate([
    (0, common_1.Post)('fetch-by-facture-number'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fetch_bill_dto_1.FetchBillDto]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "fetchByFactureNumber", null);
exports.BillsController = BillsController = __decorate([
    (0, common_1.Controller)('bills'),
    __metadata("design:paramtypes", [bills_service_1.BillsService])
], BillsController);
//# sourceMappingURL=bills.controller.js.map