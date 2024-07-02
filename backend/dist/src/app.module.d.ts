import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
export declare class AppModule implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
}
