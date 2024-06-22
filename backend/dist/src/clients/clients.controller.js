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
exports.ClientsController = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("./clients.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ClientsController = class ClientsController {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    async create(createClientDto) {
        return this.clientsService.create(createClientDto);
    }
    async findAll() {
        return this.
            clientsService.findAll();
    }
    async remove(id) {
        const deletedClient = await this.clientsService.remove(id);
        if (!deletedClient) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found`);
        }
        return { message: `Client with ID ${id} has been deleted` };
    }
    updateEmail(updateEmailDto) {
        const id = updateEmailDto.id;
        const email = updateEmailDto.email;
        return this.clientsService.updateEmail(id, email);
    }
    updatePhone(UpdatePhoneDto) {
        const id = UpdatePhoneDto.id;
        const phone = UpdatePhoneDto.phone;
        return this.clientsService.updatePhone(id, phone);
    }
    updateAddress(UpdateAddressDto) {
        const id = UpdateAddressDto.id;
        const address = UpdateAddressDto.address;
        return this.clientsService.updateAddress(id, address);
    }
    updateType(updateTypeDto) {
        const id = updateTypeDto.id;
        const type = updateTypeDto.type;
        return this.clientsService.updateType(id, type);
    }
    updateNote(updateNoteDto) {
        const id = updateNoteDto.id;
        const note = updateNoteDto.note;
        return this.clientsService.updateNote(id, note);
    }
};
exports.ClientsController = ClientsController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ClientDto]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)('/deleteClient'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)('/updateEmail'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateEmailDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "updateEmail", null);
__decorate([
    (0, common_1.Put)('/updatePhone'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdatePhoneDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "updatePhone", null);
__decorate([
    (0, common_1.Put)('/updateAddress'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateAddressDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Put)('/updateType'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateTypeDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "updateType", null);
__decorate([
    (0, common_1.Put)('/updateNote'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateNoteDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "updateNote", null);
exports.ClientsController = ClientsController = __decorate([
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
//# sourceMappingURL=clients.controller.js.map