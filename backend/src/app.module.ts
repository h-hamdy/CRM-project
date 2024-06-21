import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ConfigModule, ClientsModule],
})
export class AppModule {}
