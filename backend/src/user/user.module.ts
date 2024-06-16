import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		ConfigModule.forRoot(),
		JwtModule.registerAsync({
		  imports: [ConfigModule],
		  useFactory: async (configService: ConfigService) => ({
			secret: configService.get<string>('JWT_SECRET'), // Retrieve JWT_SECRET from .env
			signOptions: { expiresIn: '1h' },
		  }),
		  inject: [ConfigService],
		}),
	  ],
  providers: [UsersService, PrismaClient],
  controllers: [UsersController],
})
export class UsersModule {}

