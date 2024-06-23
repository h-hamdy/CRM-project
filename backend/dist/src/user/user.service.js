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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon2 = require("argon2");
const crypto = require("crypto");
const email_service_1 = require("../auth/email/email.service");
let UsersService = class UsersService {
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async createUser(email, firstName, lastName, number) {
        if (!email || !firstName || !lastName)
            throw new common_1.UnauthorizedException('Invalid Credentials!');
        const checkUser = await this.prisma.user.findUnique({
            where: { email: email },
        });
        if (checkUser) {
            throw new common_1.UnauthorizedException('Invalid email');
        }
        var password = crypto.randomBytes(8).toString('hex');
        password = password + 'P!1l';
        const hash = await argon2.hash(password);
        const user = await this.prisma.user.create({
            data: {
                email,
                hash,
                firstName,
                lastName,
                number,
            },
            select: {
                id: true,
                email: true,
                createdAt: true,
            },
        });
        await this.emailService.sendMail(email, 'Your new account', `Hello ${firstName},\n\nYour account has been created. Here are your credentials:\n\nEmail: ${email}\nPassword: ${password}\n\n`);
        return { email: user.email, password };
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            select: {
                email: true,
                firstName: true,
                lastName: true,
                number: true,
            },
            orderBy: {
                id: 'desc',
            },
        });
        return users;
    }
    async upsertInfo(data) {
        const info = await this.prisma.info.upsert({
            where: { id: 1 },
            update: {
                address: data.address,
                email: data.email,
                phone: data.phone,
                website: data.website,
            },
            create: {
                address: data.address,
                email: data.email,
                phone: data.phone,
                website: data.website,
            },
        });
        return info;
    }
    async getInfo() {
        return this.prisma.info.findUnique({ where: { id: 1 } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], UsersService);
//# sourceMappingURL=user.service.js.map