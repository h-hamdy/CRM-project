import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ConfigModule, ClientsModule, ProductModule],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    // const defaultTable = await this.prisma.dynamicColumnTable.findUnique({
    //   where: { id: 1 },
    // });

    // if (!defaultTable) {
    //   await this.prisma.dynamicColumnTable.create({
    //     data: { id: 1, columns: '[]' },
    //   });
    // }
  }

}
