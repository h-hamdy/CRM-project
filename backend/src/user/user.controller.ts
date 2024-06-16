import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/users')
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Partial<User>[]> {
    return this.usersService.findAll();
  }
}
