"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const clients_service_1 = require("./clients.service");
describe('ClientsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [clients_service_1.ClientsService],
        }).compile();
        service = module.get(clients_service_1.ClientsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=clients.service.spec.js.map