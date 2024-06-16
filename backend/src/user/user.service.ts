import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Partial<User>[]> {
    const users = await this.prisma.user.findMany({
      select: {
        email: true,
        firstName: true,
        lastName: true,
        number: true,
      },
    });

    return users;
  }

  async upsertInfo(data: { address: string; email: string; phone: string; website: string }) {
    const info = await this.prisma.info.upsert({
      where: { id: 1 }, // Assuming there will only be one Info with id 1
      update: {
        address: data.address,
        email: data.email,
        phone: data.phone,
        website: data.website,
      },
      create: {
        address: data.address,
        email: data.email,
        phone: data.phone,
        website: data.website,
      },
    });

    return info;
  }

  // Fetch the Info entry
  async getInfo() {
    return this.prisma.info.findUnique({ where: { id: 1 } });
  }
}
