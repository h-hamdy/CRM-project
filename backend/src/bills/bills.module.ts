import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
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
  providers: [BillsService],
  controllers: [BillsController]
})
export class BillsModule {}
