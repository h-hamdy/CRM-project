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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getColumnsByTableId(tableId) {
        return this.prisma.column.findMany({
            where: {
                tableId: 1,
            },
        });
    }
    async createTableWithColumns(createColumnsDto) {
        const { tableName, columns } = createColumnsDto;
        let table = await this.prisma.table.findUnique({
            where: { id: 1 },
        });
        if (!table) {
            table = await this.prisma.table.create({
                data: {
                    id: 1,
                    name: tableName,
                },
            });
        }
        else {
            throw new common_1.ConflictException('Table with id = 1 already exists');
        }
        const columnData = columns.map(column => ({
            name: column.name,
            tableId: table.id,
        }));
        await this.prisma.column.createMany({
            data: columnData,
        });
        return table;
    }
    async getAllDataRows() {
        return this.prisma.rowData.findMany();
    }
    async insertData(insertDataDto) {
        const { data } = insertDataDto;
        try {
            const rowData = await this.prisma.rowData.create({
                data: {
                    table: { connect: { id: 1 } },
                    data: data,
                },
            });
            return rowData;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Data insertion failed due to a conflict.');
            }
            throw new Error('Failed to insert data.');
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map