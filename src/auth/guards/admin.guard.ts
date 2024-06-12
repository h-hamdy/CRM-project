import { Injectable, CanActivate, ExecutionContext, ForbiddenException, ConsoleLogger } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'];
    if (user && user.isAdmin) {
      return true;
    } else {
      throw new ForbiddenException('Forbidden resource');
    }
  }
}
