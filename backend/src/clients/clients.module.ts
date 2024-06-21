import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { PrismaClient } from '@prisma/client';
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
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
