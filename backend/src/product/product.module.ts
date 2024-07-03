import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

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
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
