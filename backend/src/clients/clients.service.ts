import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path as needed
import { ClientDto, UpdateEmailDto } from './dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: ClientDto) {
	const existingUser = await this.prisma.client.findUnique({
		where: {email: createClientDto.email}
	})

	if (existingUser) {
		throw new UnauthorizedException('Client with this email already exists.');
	  }

    return this.prisma.client.create({
      data: createClientDto,
    });
  }

  async findAll(): Promise<ClientDto[]> {
    const clients = await this.prisma.client.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    return clients.map((client) => ({
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      type: client.type,
      phone: client.phone,
      address: client.address,
      note: client.note,
    }));
  }

  async remove(id: number) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return this.prisma.client.delete({ where: { id } });
  }

  async updateEmail(id, email) {
    return this.prisma.client.update({
	where: { id: Number(id) },
      data: { email },
    });
  }

  async updatePhone(id, phone) {
    return this.prisma.client.update({
	where: { id: Number(id) },
      data: { phone },
    });
  }

  async updateAddress(id, address) {
    return this.prisma.client.update({
	where: { id: Number(id) },
      data: { address },
    });
  }

  async updateType(id, type) {
    return this.prisma.client.update({
	where: { id: Number(id) },
      data: { type },
    });
  }

}
