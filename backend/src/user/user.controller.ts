import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('create-user')
  async createUser(@Body() body: { email: string; firstName: string; lastName: string, number: string }) {
	  return this.usersService.createUser(body.email, body.firstName, body.lastName, body.number);
  }

  @Get('/users')
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Partial<User>[]> {
    return this.usersService.findAll();
  }

  @Get('CompanyInfo')
  @UseGuards(JwtAuthGuard)
  async getCompanyInfo() {
    return this.usersService.getInfo();
  }

  @Post('CompanyInfo')
  @UseGuards(JwtAuthGuard)
  async upsertCompanyInfo(@Body() body: { address: string; email: string; phone: string; website: string }) {
    return this.usersService.upsertInfo(body);
  }

}


