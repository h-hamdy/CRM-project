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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const argon2 = require("argon2");
const crypto = require("crypto");
const email_service_1 = require("./email/email.service");
let AuthService = class AuthService {
    constructor(configService, prisma, jwtService, emailService) {
        this.configService = configService;
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async singup(dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.UnauthorizedException('User with this email already exists.');
        }
        const adminEmail = this.configService.get('ADMIN_EMAIL');
        const adminPassword = this.configService.get('ADMIN_PASSWORD');
        console.log(adminEmail + " " + adminPassword);
        if (dto.email !== adminEmail || dto.password !== adminPassword) {
            throw new common_1.UnauthorizedException('Invalid email or password.');
        }
        const hash = await argon.hash(dto.password);
        const user = this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
                firstName: dto.firstName,
                lastName: dto.lastName
            },
            select: {
                id: true,
                email: true,
                createdAt: true
            }
        });
        return user;
    }
    async signin(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const passwordMatch = await argon.verify(user.hash, dto.password);
        if (!passwordMatch) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isAdmin = dto.email === this.configService.get('ADMIN_EMAIL');
        const payload = { email: dto.email, isAdmin };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '1h',
        });
        return token;
    }
    async createUser(email, firstName, lastName) {
        if (!email || !firstName || !lastName)
            throw new common_1.UnauthorizedException("Invalid Credentials!");
        const checkUser = await this.prisma.user.findUnique({ where: { email: email } });
        if (checkUser) {
            throw new common_1.UnauthorizedException('Invalid email');
        }
        const password = crypto.randomBytes(8).toString('hex');
        const hash = await argon2.hash(password);
        const user = await this.prisma.user.create({
            data: {
                email,
                hash,
                firstName,
                lastName,
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map