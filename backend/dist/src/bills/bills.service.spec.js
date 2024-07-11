"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const bills_service_1 = require("./bills.service");
describe('BillsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [bills_service_1.BillsService],
        }).compile();
        service = module.get(bills_service_1.BillsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=bills.service.spec.js.map