"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const clients_controller_1 = require("./clients.controller");
describe('ClientsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [clients_controller_1.ClientsController],
        }).compile();
        controller = module.get(clients_controller_1.ClientsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=clients.controller.spec.js.map