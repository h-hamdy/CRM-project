import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ConsoleLogger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = (request as any).cookies.jwt;
    if (!token) {
		throw new UnauthorizedException('No token provided');
	  }
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      (request as any ).user = payload;
      return true;
    } catch {
		throw new UnauthorizedException('Invalid token');
    }
  }
}
