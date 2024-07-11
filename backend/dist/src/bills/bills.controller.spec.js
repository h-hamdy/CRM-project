"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const bills_controller_1 = require("./bills.controller");
describe('BillsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [bills_controller_1.BillsController],
        }).compile();
        controller = module.get(bills_controller_1.BillsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=bills.controller.spec.js.map