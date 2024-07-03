import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:123@localhost:5434/mydb?schema=public',
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

//   async table() {
//     return this.table;
//   }

//   async column() {
//     return this.column;
//   }
}
