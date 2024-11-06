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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_columns_dto_1 = require("./dto/create-columns.dto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getColumnsByTableId(tableId) {
        try {
            const columns = await this.productService.getColumnsByTableId(tableId);
            const columnNames = columns.map((column) => column.name);
            return columnNames;
        }
        catch (error) {
            return { message: 'Failed to fetch columns' };
        }
    }
    async createTableWithColumns(createColumnsDto) {
        return this.productService.createTableWithColumns(createColumnsDto);
    }
    async insertData(insertDataDto) {
        return this.productService.insertData(insertDataDto);
    }
    async getAllDataRows() {
        try {
            return await this.productService.getAllDataRows();
        }
        catch (error) {
            return { message: 'Failed to fetch data rows' };
        }
    }
    async getDataRowsByClient(client) {
        try {
            return await this.productService.getDataRowsByClient(client);
        }
        catch (error) {
            return { message: 'Failed to fetch data rows' };
        }
    }
    async getDataRowsByFacture(facture) {
        try {
            return await this.productService.getDataRowsByFacture(facture);
        }
        catch (error) {
            return { message: 'Failed to fetch data rows' };
        }
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('tableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getColumnsByTableId", null);
__decorate([
    (0, common_1.Post)('columns'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_columns_dto_1.CreateColumnsDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createTableWithColumns", null);
__decorate([
    (0, common_1.Post)('data'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_columns_dto_1.InsertDataDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "insertData", null);
__decorate([
    (0, common_1.Get)('data-rows'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllDataRows", null);
__decorate([
    (0, common_1.Post)('data-rows-by-client'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)('client')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getDataRowsByClient", null);
__decorate([
    (0, common_1.Post)('data-rows-by-facture'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)('facture')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getDataRowsByFacture", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map